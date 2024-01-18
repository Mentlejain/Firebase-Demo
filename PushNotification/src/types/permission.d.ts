interface _SCOPE{
    MANAGE: string
    VIEW: string
    NONE: string
    TAG: string
}

interface _STATS_SCOPE{
    VIEW: string,
    NONE: string,
    TAG: string
}
export declare global {
    
    interface LEVEL{
        SHASTA: string,
        MSP: string,
        BUSINESS: string,
        TAG: string
    }
    namespace PERMISSION{   
        const ORG: _SCOPE,
        const VENUE: _SCOPE,
        const INFRA: _SCOPE,
        const SCAN: _SCOPE,
        const NETWORK: _SCOPE,
        const PROFILE: _SCOPE,
        const TICKET: _SCOPE,
        const FIRMWARE: _SCOPE & {UPDATE: string},
        const HIERARCHY: _SCOPE,
        const QUOTE: _SCOPE,
        const CART: _SCOPE,
        const ORDER: _SCOPE,
        const PAYMENT: _SCOPE,
        const INVOICE: _SCOPE,
        const DEVICE: _SCOPE,
        const PRODUCT: _SCOPE,
        const ITYPE: _SCOPE,
        const RRM: _SCOPE,
        const ORG_STATS: _STATS_SCOPE,
        const VENUE_STATS: _STATS_SCOPE,
        const INFRA_STATS: _STATS_SCOPE,
        const QUOTE_STATS: _STATS_SCOPE,
        const NOTIFICATION_STATS: _STATS_SCOPE

        const IDENTITY: _SCOPE,
        const LEVEL: LEVEL
    }
}