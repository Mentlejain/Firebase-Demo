/* eslint-disable no-var */



/***
 * 
 * Define global variables
 * @file index.d.ts
 * @description Define global variables
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export * from './util'
export * from './logger'
export * from './orgmeta'
export * from './timer'
export * from './tiptoken'
export * from './redisclient'
export * from './emailhandler'
export * from './interface'
export * from './errorcode'
export * from './errormessage'
export * from './kafka'
export * from './constant'
export * from './session'
export * from './swagger'
export * from './permission'
export * from './type'
declare global {
    var TipToken: TipToken;
    var RedisClient: RedisClient;
    var faultHandler: FaultHandler;
    var Logger: Logger
    var EmailHandler: EmailHandler
    var OrgMeta:OrgMeta
    var Timer: Timer
    var Util: Util
    var ErrorCode: ErrorCode
    var ErrorMessage: ErrorMessage
    var KAFKA: KAFKA
    var CONSTANT: CONSTANT
    var SwaggerClient: SwaggerClient
    var PERMISSION: PERMISSION
}


  