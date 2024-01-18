// export const CREATE_ORG = 'create-org'
// export const UPDATE_ORG = 'update-org'
// export const DELETE_ORG = 'delete-org'
// export const UPDATE_OLS = 'update-org-ols'
// export const CREATE_IDENTITY = 'create-identity'
// export const UPDATE_IDENTITY = 'update-identity'
// export const DELETE_IDENTITY = 'delete-identity'
// export const UPGRADE_STATUS  = 'upgrade-status'
// export const UPGRADE_EMAIL  = 'upgrade-email'

// export const UPDATE_MARKET_PLACE = 'market-place'
// export const FIRMWARE_UPGRADE = 'firmware-upgrade'
// export const SUPPORT_REPLY  = 'support-reply'
// export const UPDATE_STATUS_INFRASTRUCTURE = 'status-infrastructure';
// export const QUOTE_EMAIL = 'quote-email'
// export const ALARM_NOTIFICATION = 'ALARM_NOTIFICATION'

// //Shasta Cloud topics
// export const ORG_TOPIC = 'cloud_organization'
// export const VENUE_TOPIC = 'cloud_venue'
// export const INFRASTRUCTURE_TOPIC = 'cloud_infrastructure'
// export const IDENTITY_TOPIC = 'cloud_identity'
// export const REMOVE_SESSION = 'cloud_remove_session'
// export const UPGRADE_TOPIC = 'cloud_upgrade'
// export const SEND_EVENT = 'cloud_websocket'
// export const MARKET_PLACE_TOPIC = 'cloud_marketplace'
// export const FLOOR_PLAN_TOPIC = 'cloud_floorplan'
// export const INFRA_COUNT_TOPIC = 'cloud_infrastructure_count'
// export const INFRA_STATUS_TOPIC = 'cloud_infrastructure_status'
// export const CLOUD_EVENT_QUEUE_TOPIC = 'cloud_event_queue'
// export const EMAIL_TOPIC = 'cloud_email'

// export const topicList:any = [  ORG_TOPIC,VENUE_TOPIC,
//                                 INFRASTRUCTURE_TOPIC,
//                                 IDENTITY_TOPIC,
//                                 REMOVE_SESSION,
//                                 UPGRADE_TOPIC,
//                                 SEND_EVENT,
//                                 MARKET_PLACE_TOPIC,
//                                 FLOOR_PLAN_TOPIC,
//                                 INFRA_COUNT_TOPIC,
//                                 INFRA_STATUS_TOPIC,
//                                 CLOUD_EVENT_QUEUE_TOPIC,
//                                 EMAIL_TOPIC]
// //Controller topic
// export const AP_EVENT = 'device_event_queue'



// export function extractKafkaPayload(kafkaMessageString: string) {
//   try {
//     if (!kafkaMessageString) {
//       return {id: '', category: '', data: '', err: 'kafkaMessageString is empty'}
//     }
//     let kafkaMessage: KafkaMessage = JSON.parse(kafkaMessageString)
//     if (!kafkaMessage.id) {
//       console.log('id not found')
//       return {id: '', category: '', data: '', err: 'id not defined'}
//     }
//     if (!kafkaMessage.message || !kafkaMessage.message.category || !kafkaMessage.message.data) {
//       console.log('no message found')
//       return {id: kafkaMessage.id, category: '', data: '', err: 'No message defined'}
//     }
//     return {id: kafkaMessage.id, category: kafkaMessage.message.category, data: JSON.stringify(kafkaMessage.message.data), err:''}
//   } catch (e) {
    
//     return {id: '', category: '', data: '', err: e}
//   }
// }