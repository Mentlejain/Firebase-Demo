export declare global {
    interface TOPIC{
        ORG_TOPIC: string
        VENUE_TOPIC: string
        INFRASTRUCTURE_TOPIC: string
        IDENTITY_TOPIC: string
        SESSION: string
        UPGRADE_TOPIC: string
        SEND_EVENT: string
        MARKET_PLACE_TOPIC: string
        FLOOR_PLAN_TOPIC: string
        INFRA_COUNT_TOPIC: string
        INFRA_STATUS_TOPIC: string
        CLOUD_EVENT_QUEUE_TOPIC: string
        INFRA_TYPE_REFRESH_TOPIC: string
        EMAIL_TOPIC: string
        WIRELESS_POLICY_TOPIC: string
        AP_EVENT: string
        CONNECTION: string
        STATE: string
    }
    interface CATEGORY{
        CREATE_ORG: string
        UPDATE_ORG: string
        DELETE_ORG: string
        HARD_DELETE_ORG: string
        
        UPDATE_OLS: string
        CREATE_IDENTITY: string
        UPDATE_IDENTITY: string
        DELETE_IDENTITY: string

        ADD_ON_IDENTITY: string
        DEL_ON_IDENTITY: string
        
        UPGRADE_STATUS : string
        UPGRADE_EMAIL : string
        SEND_EVENT: string

        REMOVE_SESSION: string
        ADD_SESSION: string
        ADD_ON_SESSION: string
        DEL_ON_SESSION: string
        
        ATTACH_VENUE_SESSION: string
        DETACH_VENUE_SESSION: string
        DEL_ON_VENUE_SESSION: string

        UPDATE_MARKET_PLACE: string
        FIRMWARE_UPGRADE: string
        SUPPORT_REPLY : string
        UPDATE_STATUS_INFRASTRUCTURE: string
        QUOTE_EMAIL: string
        ALARM_NOTIFICATION: string
        DEVICE_BOOT_UP: string

        CREATE_VENUE: string
        UPDATE_VENUE: string
        DELETE_VENUE: string
        INFRA_COUNT: string
        UE_DEBUG: string

    }
    namespace KAFKA{
        const TOPIC: TOPIC
        const CATEGORY: CATEGORY     
        const LIST: string[]   
        const LIST_GTW: string[]
    }
    interface KafkaMessage {
        id: string
        message: {
          category: string
          data: any
        }
    }
}