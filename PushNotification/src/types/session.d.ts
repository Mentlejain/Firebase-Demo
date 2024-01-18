
export declare global {
    interface SessionProfile {
        identityId?: string
        userName?: string
        email?: string
        auth0IdentityId: string
        orgs: {orgId: number, hierarchy?: number, allVenues?: boolean, children?: number[]}[]
        defaultOrgId: number
        exp?: number
        iat?: number
        [attribute: string]: {
            hierarchy: number
            allVenues?: boolean
            venues?: {venueId: number, permissions: string[]}[]
            roleName?: string
            roles?: { role: string, custom: boolean, roleId: number }[]
            orgTypeId?: number
            isCustomRole?: boolean
            customPermission?: string[]
            systemPermission?: string[]
            permissionId?: number
            isShasta?: boolean
            isMSP?: boolean
            isBusiness?: boolean
            isShastaAdmin?: boolean
            isMSPAdmin?: boolean
            isBusinessAdmin?: boolean
            isAdmin?: boolean
        }
        sessionId?: number
        //
        validateSession(sessionId:number | undefined): number | void
        getPermissionId(sessionId: number | undefined): number | number[] | void
        getHierarchy(permissionId: number | undefined): number
    }
   
}