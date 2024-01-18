const AUTH0: AUTH0 = {
    ORG_ID: 'http://shasta-cloud.net/orgId',
    PERMISSION: 'http://shasta-cloud.net/permissions',
    SESSION_EXPIRY: parseInt(process.env.SESSION_EXPIRY || '') || 10000,
    HIERARCHY: "http://shasta-cloud.net/hierarchy",
    SUB_ORGS: "http://shasta-cloud.net/orgs"
}
const SWAGGER: SWAGGER = {
    API_KEY: process.env.SWAGGER_API_KEY || '',
    BASEPATH: process.env.SWAGGER_BASEPATH || ''
}
const SCOPE: SCOPE = {
    MANAGE: 4,
    DELETE: 3,
    UPDATE: 2,
    VIEW: 1,
    NONE: 0
}
const EMAIL: EMAIL = {
    INVITE_ORG: 'INVITE_ORG',
    INVITE_USER: 'INVITE_USER',
    UNSUBSCRIBE_USER: 'UNSUBSCRIBE_USER',
    SUBSCRIBE_USER: 'SUBSCRIBE_USER',
    BROADCAST: 'BROADCAST',
    UPGRADE_EMAIL: 'upgrade-email',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    NEW_INVITE_USER: 'NEW_INVITE_USER',
    QUOTE_MAIL: 'QUOTE_MAIL'
}
const TIP_ROUTE: TIP_ROUTE = {
    AUTH: process.env.TIPAUTH || '',
    COMMAND: process.env.TIP_GATEWAY_URL + "/commands",
    ENTITY: process.env.TIP_PROV_URL + '/entity',
    VENUE: process.env.TIP_PROV_URL + '/venue'
}
const HIERARCHY: HIERARCHY = {
    INVALID: 0,
    NEED_VALIDATION: 1,
    VALIDATED: 2
}
const LEVEL_TYPE: LEVEL_TYPE = {
    SHASTA: {
        TAG: 'Shasta',
        ADMIN: 'Platform-Admin'
    },
    MSP: {
        TAG: 'MSP',
        ADMIN: 'MSP-Admin'
    },
    Business: {
        TAG: 'Business',
        ADMIN: 'Business-Admin'
    }
}
let d = {
    CANCELED: 1,
    COMMERCIAL: 2,
    DISABLED: 3,
    FIRST_ORDER: 4,
    IN_ACTIVE: 5,
    LOST:6,
    ON_BOARDING:7,
    OPPORTUNITY: 8,
    QUOTE: 9,
}
const STATE: STATE = {

    MSP: {
        CANCELED: 1,
    COMMERCIAL: 2,
    DISABLED: 3,
    FIRST_ORDER: 4,
    IN_ACTIVE: 5,
    LOST:6,
    ON_BOARDING:7,
    OPPORTUNITY: 8,
    },

    BUSINESS: {
       

        CANCELED: 1,
    COMMERCIAL: 2,
    DISABLED: 3,
    FIRST_ORDER: 4,
    IN_ACTIVE: 5,
    LOST:6,
    OPPORTUNITY: 8,
    QUOTE: 9,
    },

    VENUE: {

        CANCELED: 1,

        DELIVERED: 2,

        DEPLOYED: 3,

        DISABLED: 4,

        LIVE: 5,

        LOST: 6,

        ORDERED: 7,

        PLANNING: 8,

        QUOTED: 9,

        SHIPPED: 10

    }

};
export const CONSTANT: any = {
    EMAIL: EMAIL,
    TIP_ROUTE: TIP_ROUTE,
    AUTH0: AUTH0,
    SWAGGER: SWAGGER,
    SCOPE: SCOPE,
    HIERARCHY: HIERARCHY,
    LEVEL_TYPE: LEVEL_TYPE,
    MAX_HIERARCHY_LEVEL: 5,
    STATE: STATE
}