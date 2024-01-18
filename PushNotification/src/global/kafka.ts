const TOPIC: TOPIC = {
    // Cloud topics
    ORG_TOPIC: 'cloud_organization',
    VENUE_TOPIC: 'cloud_venue',
    INFRASTRUCTURE_TOPIC: 'cloud_infrastructure',
    IDENTITY_TOPIC: 'cloud_identity',
    SESSION: 'cloud_session',
    UPGRADE_TOPIC: 'cloud_upgrade',
    SEND_EVENT: 'cloud_websocket',
    MARKET_PLACE_TOPIC: 'cloud_marketplace',
    FLOOR_PLAN_TOPIC: 'cloud_floorplan',
    INFRA_COUNT_TOPIC: 'cloud_infrastructure_count',
    INFRA_STATUS_TOPIC: 'cloud_infrastructure_status',
    INFRA_TYPE_REFRESH_TOPIC: 'cloud_infra_type_refresh',
    CLOUD_EVENT_QUEUE_TOPIC: 'cloud_event_queue',
    EMAIL_TOPIC: 'cloud_email',

    WIRELESS_POLICY_TOPIC: 'cloud_wireless_policy',
    // Controller topics
    AP_EVENT: 'device_event_queue',
    CONNECTION: 'connection',
    STATE: 'state',

}

const CATEGORY: CATEGORY = {
    CREATE_ORG: 'create-org',
    UPDATE_ORG: 'update-org',
    DELETE_ORG: 'delete-org',

    HARD_DELETE_ORG: 'hard-delete-org',
    
    UPDATE_OLS: 'update-org-ols',
    
    CREATE_IDENTITY: 'create-identity',
    UPDATE_IDENTITY: 'update-identity',
    DELETE_IDENTITY: 'delete-identity',
    ADD_ON_IDENTITY: 'add-on-identity',
    DEL_ON_IDENTITY: 'del-on-identity',
    

    UPGRADE_STATUS : 'upgrade-status',
    
    UPGRADE_EMAIL : 'upgrade-email',

    SEND_EVENT: 'cloud_websocket',

    REMOVE_SESSION: 'remove-session',
    ADD_SESSION: 'add-session',
    ADD_ON_SESSION: 'add-on-session',
    DEL_ON_SESSION: 'del-on-session',
    
    ATTACH_VENUE_SESSION: 'attach-venue-session',
    DETACH_VENUE_SESSION: 'detach-venue-session',
    DEL_ON_VENUE_SESSION: 'del-on-venue-session',

    UPDATE_MARKET_PLACE: 'market-place',
    FIRMWARE_UPGRADE: 'firmware-upgrade',
    SUPPORT_REPLY : 'support-reply',
    UPDATE_STATUS_INFRASTRUCTURE: 'status-infrastructure',
    QUOTE_EMAIL: 'quote-email',
    ALARM_NOTIFICATION: 'ALARM_NOTIFICATION',
    DEVICE_BOOT_UP: 'device-boot-up',

    CREATE_VENUE: 'create-venue',
    UPDATE_VENUE: 'update-venue',
    DELETE_VENUE: 'delete-venue',
    INFRA_COUNT: 'infra-count',
    UE_DEBUG: 'ue-debug',

}
export const KAFKA: any = {
    TOPIC: TOPIC,
    CATEGORY: CATEGORY,
    LIST: Object.values(TOPIC).filter((it:string) => it.includes('cloud_')),
    LIST_GTW: Object.values(TOPIC).filter((it:string) => !it.includes('cloud_'))

}
