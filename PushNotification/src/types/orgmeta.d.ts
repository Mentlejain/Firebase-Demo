export declare global{

    namespace OrgMeta {
        function getOrgType(orgTypeId: number): OrganizationType | void
        function getRole(roleId: number,without?:string[]): Role | void
        function getRolesByOrg(orgTypeId: number,without?:string[]): Role[]
        function getOrgByRole(roleId: number): OrganizationType | void
        function getOrgTypeAll(): OrganizationType[]
        function searchOrgType(searchString:string | undefined): number[]
        function getAdmin(roles: Role[] = []): Role | void
        function getAdminByOrgType(orgTypeId: number): Role | void
        function getRoleName(roleIds: number[] = []): string
        var shastaOrgId: number;

    }
}