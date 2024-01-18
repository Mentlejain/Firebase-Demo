// import type {
//     RedisClientType
// } from 'redis'

// import {
//     createClient
// } from 'redis'


// export class RedisClient {
//     constructor(public redis_url: string, cache_type: string) {
//         if (cache_type == 'aws_elasticache') {
//             console.log(" AWS Elasticache redis cluster")
//             this.cacheOptions = {
//                 url: redis_url,
//                 socket: {
//                     tls: true
//                 }
//             }
//             this.init()

//         } else {
//             console.log("Server redis cluster")
//             this.cacheOptions = {
//                 url: redis_url
//             }
//             this.init()
//         }
//     }
//     isReady: boolean
//     client: RedisClientType
//     cacheOptions: any
//     ueLIST: any

//     private initUE = () => {
//         const fs = require("fs");

//         fs.readFile("./src/util/oui.json", "utf8", (err: any, jsonString: any) => {
//             if (err) {
//                 console.log("Error reading file from disk:", err);
//                 return;
//             }
//             try {
//                 this.ueLIST = JSON.parse(jsonString);
//             } catch (err) {
//                 console.log("Error parsing JSON string:", err);
//             }
//         });
//     }
//     getUEName = (mac: string): string =>{
//         try {
//             return this.ueLIST[mac.replace(/:/g, "").toLocaleLowerCase().slice(0, 6)] || 'Unknown'
//         } catch (e) {
//             return 'Unknown'
//         }
//     }

//     async init(): Promise<RedisClientType> {
//         Logger.info(` unknown unknown redis url// -- RedisClient: Connecting with redis cluster`)
//         this.initUE()
//         if (!this.isReady) {
//             this.client = createClient({
//                 ...this.cacheOptions,
//             })
//             this.client.on('error', (err: any) => {
//                 Logger.error(` unknown unknown redis url// -- RedisClient: Error ${err}`)
//             })
//             this.client.on('connect', () => Logger.info(` unknown unknown redis url// -- RedisClient: Redis connected`))
//             this.client.on('reconnecting', () => Logger.info(` unknown unknown redis url// -- RedisClient: Redis reconnecting`))
//             this.client.on('ready', () => {
//                 this.isReady = true
//                 Logger.info(` unknown unknown redis url// -- RedisClient: Redis is ready`)

//             })
//             await this.client.connect()
//         }
//         return this.client
//     }
//     get = async (key: string): Promise<any> => {
//         try {
//             if (!key) {
//                 Logger.error(` unknown unknown redis url// -- getDetailsFromRedis: serialNumber not defined`)
//                 return null
//             }
//             let res = await this.client.hGetAll(key)

//             return {
//                 "infraCategory": parseInt(res.infra_category || '0'),
//                 "status": res.current_status || '',
//                 "infraItemId": parseInt(res.infra_id || '0'),
//                 "orgId": parseInt(res.org_id || '0'),
//                 "venueId": parseInt(res.venue_id || '0'),
//                 "venueName": res.venue_name || '',
//                 "infraName": res.infra_name || '',
//             }

//         } catch (e) {
//             Logger.error(` unknown unknown redis url// -- getDetailsFromRedis: [${key}] Error ${e}`)
//             return null
//         }
//     }

// }