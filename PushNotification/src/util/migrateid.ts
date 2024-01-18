import { UserRepository } from "../repositories";

export const fillDefaultOrgId = async(
userRepository: UserRepository,
) => {
    let query = `with res as (
        select identity_id,array_agg(distinct org_id) as orgs from "IdentityRolewithOrg"
        group by identity_id),
        shasta as (
        select org_id from "Organization" where org_type_id = 1),
        list as (
        select * from res where not((select org_id from shasta) = any(orgs))
        )
        select * from list
        where 
        ARRAY_LENGTH(orgs,1) > 1
        `
    const res = await userRepository.execute(query);
    console.log(res);
    console.log(res.length)
    let conflictIdentities: any = [];
    let validIdentities = [] as {identity_id: string, default_org_id: number}[]
    await res.reduce(async (acc: any,its: any) => {
        await acc;
        let queryToselectDefaultOrg = `
                            
        select child_id as org_id,(
            WITH RECURSIVE OrgHierarchy AS (
                    SELECT org_id, parent_org_id
                    FROM public."Organization"
                    WHERE org_id=child_id and is_active=true
                    UNION ALL
                    SELECT o.org_id, o.parent_org_id
                    FROM public."Organization" o
                    INNER JOIN OrgHierarchy oh ON oh.parent_org_id = o.org_id
                )
                SELECT  array_agg(parent_org_id)  FROM OrgHierarchy where parent_org_id is not null

            ) as parents from unnest(Array[${its.orgs.join(',')}])AS data(child_id)
                        `
                    const sres = await userRepository.execute(queryToselectDefaultOrg)
                    if(sres.length){
                        let isFound = false
                        let newDefaultId = 0
                        its.orgs.map((it: number) => {
                            if(!isFound){
                                if(sres.every((item: any) => item.org_id == it || item?.parents?.includes(it))){
                                    isFound = true
                                    newDefaultId = it
                                }
                            }
                        })
                        if(!isFound){
                            conflictIdentities.push(its.identity_id)
                            return
                        }else{
                            validIdentities.push({identity_id: its.identity_id, default_org_id:newDefaultId})
                        }
                    }
                    return acc
        
    },{})

    console.log('conflict ', conflictIdentities)
    console.log('validIdentities ', validIdentities)
    if(validIdentities?.length){
        validIdentities.map((item: any) =>{
            
            userRepository.execute(`
            update "Identity" 
            set org_id = ${item.default_org_id}
            where identity_id = '${item.identity_id}'`)
        })   
    }
    if(conflictIdentities?.length){
        const conflict = await userRepository.execute(`
        select id.identity_id, name, email, array_agg(idn.org_id) as orgs from "Identity" id
        join "IdentityRolewithOrg" idn
        on(idn.identity_id = id.identity_id)
        where 
        id.identity_id in(${conflictIdentities.map((it:string) => `'${it}'`).join()}) and is_active = true
        group by id.identity_id


        `)
        console.log(conflict)
    }

}