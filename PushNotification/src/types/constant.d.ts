export declare global {
    interface AUTH0{
        ORG_ID: string
        PERMISSION: string
        SESSION_EXPIRY: number
        HIERARCHY: string
        SUB_ORGS: string
    }
    interface SWAGGER{
        API_KEY: string
        BASEPATH: string
    }
    interface EMAIL{
        INVITE_ORG: string
        INVITE_USER: string
        UNSUBSCRIBE_USER: string
        SUBSCRIBE_USER: string
        BROADCAST: string
        UPGRADE_EMAIL: string
        FORGOT_PASSWORD: string
        NEW_INVITE_USER: string
        QUOTE_MAIL: string
    }
    interface TIP_ROUTE {
        AUTH: string,
        COMMAND: string,
        ENTITY: string,
        VENUE: string
    }
    interface SCOPE{
        MANAGE: number
        DELETE: number
        UPDATE: number
        VIEW: number
        NONE: number
    }
    interface LEVEL_TYPE{
        SHASTA: {
            TAG: string
            ADMIN: string
        }
        MSP: {
            TAG: string
            ADMIN: string
        }
        Business: {
            TAG: string
            ADMIN: string
        }
    }
    interface HIERARCHY{
        INVALID: number
        NEED_VALIDATION: number
        VALIDATED: number
    }
    interface STATE {

        MSP: {
        
            OPPORTUNITY: number;

            ON_BOARDING: number;

            FIRST_ORDER: number;

            COMMERCIAL: number;

            IN_ACTIVE: number;
            LOST: number;

            DISABLED: number;

            CANCELED: number;

        };

        BUSINESS: {
            OPPORTUNITY: number;
            QUOTE: number;
            FIRST_ORDER: number;
            COMMERCIAL: number;
            IN_ACTIVE: number;
            LOST: number;

            DISABLED: number;

            CANCELED: number;

        };

        VENUE: {

            PLANNING: number;

            QUOTED: number;

            ORDERED: number;

            SHIPPED: number;

            DELIVERED: number;

            DEPLOYED: number;

            LIVE: number;

            LOST: number;

            DISABLED: number;

            CANCELED: number;

        };

    }
    namespace CONSTANT{   
        const EMAIL: EMAIL,
        const TIP_ROUTE: TIP_ROUTE,
        const AUTH0: AUTH0,
        const SWAGGER: SWAGGER
        const SCOPE: SCOPE
        const HIERARCHY: HIERARCHY
        const LEVEL_TYPE: LEVEL_TYPE
        const MAX_HIERARCHY_LEVEL: number
        const STATE: STATE
    }
}