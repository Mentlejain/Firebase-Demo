
export declare global{
    interface MAPI {
        data: any,
        error: any
    }

    interface customErrorBody {
        statusCode: number
        message: string
        code: number
    }

    interface ENV{
            PORT: string,
    
            AUDIENCE: string,
            DOMAIN: string,
            ISSUER: string,
            SESSION_EXPIRY: string,
    
            AUTH_CLIENT_ID: string,
            MGMT_CLIENT_ID: string,
            CONNECTION_ID: string,
            CONNECTION: string,
    
            ENABLED_HTTPS: string,
    
            TIP_USERID: string,
            TIPAUTH: string,
            TIP_PROV_URL: string,
            TIP_GATEWAY_URL: string,
    
            WEB_HOST: string,
    
            REGION: string,
            BUCKET: string,
            ORG_FOLDER: string,
            IDENTITY_FOLDER: string,
            PUBLIC_BUCKET: string,
            FIRMWARE_BUCKET: string,
    
            BASE_URL: string,
            BILLING_URL: string,
            API_GATEWAY_BASE_URL: string,

            EVENT_NAMESPACE: string,
    
            ELASTIC_URL: string,
            ELASTIC_USERNAME: string,
    
            CACHE_TYPE: string,
    
            SWAGGER_USER: string,

            SWAGGER_BASEPATH: string,
            TAG: string
    }
    interface SocketMessage {
        id: string
        message: SocketPayload
    }
    interface IdentityContext{
        identityId: string
        auth0IdentityId: string
        email?: string
        userName?: string
        defaultOrgId: number
        allVenues?: boolean
        venues?: {venueId: number, permissions: string[]}[]
        orgLevel?: boolean
        scope?: string
        hierarchy?: number
        roles?: object[]
        roleName?: string
        isCustomRole?: boolean
        orgTypeId?: number
        systemPermission?: string[]
        customPermission?: string[]
        systemJsonView?: object[]
        customJsonView?: object[]
        orgs: {orgId: number, hierarchy?: number, allVenues?: boolean, children?: number[]}[]
        isShasta?: boolean
        isMSP?: boolean
        isBusiness?: boolean
        isShastaAdmin?: boolean
        isMSPAdmin?: boolean
        isBusinessAdmin?: boolean
        isAdmin?: boolean
        sessionId?: number
        permissionId: number
        exp?: number
        iat?: number
        method?: string
        url?: string
        os?: string
        browser?; string
        [attribute: string]: any
        validateSession(sessionId: number | undefined): number | void
        getPermissionId(sessionId: number | undefined): number | void
        getHierarchy(permissionId: number | undefined): number
 
    }

}