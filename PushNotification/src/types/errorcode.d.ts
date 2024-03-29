export declare global {
    namespace ErrorCode {
        const SOMETHING_WENT_WRONG: number,
        const INVALID_ACCESS: number,
        const BODY_NOT_SENT: number,
        const EMPTY_BODY: number,
        const UNAUTHORIZED: number,
        const INVALID_PURPOSE: number,
        const INSUFFICIENT_SCOPE: number,
        const REQUIRED_PARAMETERS: number,
        const NOT_AUTHORIZED: number,
        const INVALID_IMAGE_FORMAT: number,
        const CANNOT_UPDATE_ROLE_ITSELF: number,
        const INVALID_ORGANIZATION: number,
        const ORGANIZATION_NOT_FOUND: number,
        const INVALID_CHILD_ORGANIZATION_ACCESS: number,
        const SUB_ORGANIZATION_PRESENT: number,
        const INVALID_ORGANIZATION_CREATE: number,
        const ORGANIZATION_NAME_VALID: number,
        const PARENT_ORGANIZATION_NOT_FOUND: number,
        const ORGANIZATION_DETAILS_NOT_FOUND: number,
        const SELF_ORGANIZATION_DELETE: number,
        const INVALID_ORGANIZATION_TYPE: number,
        const MAXIMUM_ORGANIZATION_LEVEL: number,
        const INVALID_DATE: number,
        const SELF_ORGANIZATION_MARKET_PLACE: number,
        const INVALID_ROLE_TYPE: number,
        const IDENTITY_NOT_FOUND: number,
        const INVALID_PHONENUMBER: number,
        const MINIMUM_NAME_VALID: number,
        const USER_NAME_VALID: number,
        const INVALID_ACCESS_IDENTITY: number,
        const INVALID_EMAIL: number,
        const INVALID_ROLE: number,
        const PERMISSION_EXIST: number,
        const IDENTITY_FOUND: number,
        const INVITE_NOT_FOUND: number,
        const INVALID_RESENT_INVITE: number,
        const INVITE_NOT_SENT_UNSUBSCRIBED: number,
        const IDENTITY_DETAILS_NOT_FOUND: number,
        const INVALID_PASSWORD: number,
        const PASSWORD_REQUIREMENT: number,
        const INVALID_ID: number,
        const INVALID_IDENTITY: number,
        const CANNOT_BLOCK_ITSELF: number,
        const CANNOT_DELETE_ITSELF: number,
        const IDENTITY_ALREADY_UNSUBSCRIBED: number,
        const IDENTITY_ALREADY_SUBSCRIBED: number,
        const INVITE_NOT_DELETE: number,
        const INVALID_CREDENTIAL: number,
        const PERMISSION_NOT_FOUND: number
        const ROLE_EXIST: number,
        const ROLE_NOT_FOUND: number,
        const SYSTEM_ROLE_CANNOT_UPDATE: number,
        const INVALID_SYSTEM_ROLE_ACCESS: number,
        const MULTI_ORG_HIERARCHY: number,
        const CANNOT_INVITE_ITSELF: number
        const LINK_EXPIRED: number,
        const CANNOT_ASSIGNED_VENUE_ITSELF: number,
        const MAXIMUM_EMAIL_LIMIT: number,
        const INVALID_PERMISSION: number,
        const CANNOT_ASSIGNED_VENUE_PERMISSION_TO_ADMIN: number,
        const INVALID_STATE: number,
        const CUSTOM_VENUE_CREATION: number,
        const INVALID_PADMIN: number,
        const IDENTITY_ALREADY_PADMIN: number,
        const IDENTITY_HIERARCHY: number,
        const IDENTITY_DELETE: number,

        const INFRASTRUCTURE_NOT_FOUND: number,
        const INFRASTRUCTURE_EXISTS: number,
        const INFRASTRUCTURE_UNASSIGNED: number,
        const INFRASTRUCTURE_DETAILS_NOT_SENT: number,
        const INFRATYPE_NOT_FOUND: number,
        const INFRATYPE_EXISTS: number,
        const INVALID_SERIALNUMBER: number,
        const INFRASTRUCTURE_NOT_FOUND_TIP: number,

        const SSID_NOT_MATCH: number,
        const NETWORKTYPE_NOT_FOUND: number,
        const NETWORK_NOT_FOUND: number,
        const NETWORK_EXISTS: number,
        const RADIUS_REQUIRED: number,
        const RADIUS_NOT_REQUIRED: number,
        const INVALID_RADIUS_HOST: number,
        const PASSWORD_NOT_REQUIRED: number,
        const PASSWORD_REQUIRED: number,
        const AUTHORIZATION_PORT_REQUIRED: number,
        const ACCOUNTING_PORT_REQUIRED: number,
        const RADIUS_SECRET_REQUIRED: number,
        const COA_CONFIG_REQUIRED: number,
        const VENUE_REMOVE_NETWORK: number,
        const VENUE_ATTACH_NETWORK: number,
        const AP_NOT_FOUND: number,
        const RF_NOT_FOUND: number,
        const DUPLICATE_BANDS: number,
        const DEFAULT_PROFILE_CANNOT_DELETE: number,

        const VENUE_NOT_FOUND: number,
        const MAXIMUM_VENUE_LEVEL: number,
        const VENUE_DETAILS_NOT_FOUND: number,
        const DEFAULT_VENUE_UPDATE: number,
        const DEFAULT_VENUE_DELETE: number,
        const FLOOR_PLAN_NOT_FOUND: number,
        const CHILD_VENUE_EXISTS: number,
        const INVALID_FLOOR_DATA: number,
        const FLOOR_EXISTS: number,
        const TOP_LEVEL_MUST_BE_SITE: number,
        const INVALID_VENUE_TYPE: number,
        const PARENT_VENUE_NOT_FOUND: number,
        const VENUE_NOT_BELONGS_TO_ORG: number,
        const VENUE_INVALID_ACCESS: number,
        const VENUE_INVALID_ASSIGNMENT: number,
        const REASON_NOT_SENT: number,
        
        const AUTH0_DOWN: number,
        const TIP_AUTH_DOWN: number,
        const TIP_PROV_DOWN: number,
        const ORG_DOWN: number,
        const DB_DOWN: number,

        const TIP_AUTH_OFFSET: number,
        const TIP_PROV_OFFSET: number,
        const AUTH0_OFFSET: number,
        const ORG_OFFSET: number
    }
}