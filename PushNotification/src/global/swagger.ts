// import axios from 'axios';
// import { AbortController } from 'node-abort-controller';
// import { SERVICE_TIMEOUT } from '../util/error';
// /***
//  * 
//  * Service class for swagger api doc
//  * @file swagger.ts
//  * @description Service class for swagger api doc.
//  * @author Ajay Kumawat
//  * @since 19 Jun 2023
//  */





// export class SwaggerClient {    
//     private static async callAPI(token: string, method: string, url: string, data: (object | null)) {
        
//         var timeout;
//         try {

//             const controller = new AbortController();
//             const { signal } = controller;
//             const apiReq = {
//                 method: method,
//                 url: url,
//                 headers: {
//                     authorization: token,
//                 },
//                 data: data,
//                 signal: signal
//             };

//             timeout = setTimeout(() => {
//                 controller.abort();
//             }, SERVICE_TIMEOUT);
//             let res = await axios(apiReq);
//             if (timeout) {
//                 clearTimeout(timeout);
//             }
//             const ret: MAPI = {
//                 data: res.data,
//                 error: null
//             };
//             return ret;
//         } catch (e) {
//             if (timeout) {
//                 clearTimeout(timeout);
//             }
//             const ret: MAPI = {
//                 data: null,
//                 error: e
//             };
//             return ret;
//         }

//     }

   
//     static async getSwaggerList(query: string) {
//         try {
//             const res = await this.callAPI(CONSTANT.SWAGGER.API_KEY, 'GET', `${CONSTANT.SWAGGER.BASEPATH}${query}`, null);
//             return res;
//         } catch (e) {
//             const ret: MAPI = {
//                 data: null,
//                 error: e
//             };
//             return ret;
//         }
//     }
// }

