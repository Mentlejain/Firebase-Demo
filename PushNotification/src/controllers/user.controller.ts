// // src/controllers/fcm-token.controller.ts
// import { post, requestBody, HttpErrors, del, patch, param } from '@loopback/rest';
// import { UserStorage } from '../utils/user-storage';

// export class UserController {
//     private userStorage: UserStorage;
//     constructor() {
//         this.userStorage = UserStorage.getInstance();
//   }

//   @post('/store-user')
//   async storeUser(
//     @requestBody(
//       {
//         content: {
//           'application/json': {
//             schema: {
//               type: 'object',
//               title: 'UserStorageRequest',
//               properties: {
//                 orgId: {type: 'number'},
//                 userId: {type: 'number'},
//                 role: {type: 'string'},
//                 isActive: {type: 'boolean'},
//               },
//             },
//             required: ['orgId', 'userId', 'role', 'isActive'],
//           },
//         },
//       },
//     ) userRequest: any,
//   ): Promise<any> {
//     try {
//         await this.userStorage.createUser(
//             userRequest.userId,
//             userRequest.orgId,
//             userRequest.role,
//             userRequest.isActive,
//         );
//       return {
//         status: 'success',
//       };
//     } catch (err) {
//       console.log(err);
//       throw new HttpErrors.InternalServerError(err);
//     }
// }

//   //delete user api
//   @del('/user/{orgId}')
//   async deleteFromOrg(
//     @param.path.number('orgId') orgId: number,
//       @requestBody(
//           {
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   title: 'UserStorageRequest',
//                   properties: {
//                     userId: {type: 'array', items: {type: 'number'}},
//                   },
//                 },
//                 required: ['userId'],
//               },
//             },
//           },
//         ) userRequest: any,
//   ): Promise<any> {
//       try {
//           for (const userId of userRequest.userId) {
//               await this.userStorage.deleteUserFromOrg(
//                   userId,
//                   orgId,
//               );
//           }
//         return {
//           status: 'success',
//         };
//       } catch (err) {
//         throw new HttpErrors.InternalServerError(err);
//       }
//   }

//     @patch('/user/{userId}/{orgId}')
//     async toggleUserOrgNotification(
//         @param.path.number('userId') userId: number,
//         @param.path.number('orgId') orgId: number,
//       @requestBody(
//         {
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 title: 'UserStorageRequest',
//                 properties: {
//                   isActive: {type: 'boolean'},
//                 },
//               },
//               required: ['isActive'],
//             },
//           },
//         },
//       ) userRequest: any,
//     ): Promise<any> {
//       try {
//         await this.userStorage.toggleUserOrgNotifications(
//           userId,
//           orgId,
//           userRequest.isActive,
//         );
//         return {
//           status: 'success',
//         };
//       }
//       catch (err) {
//         throw new HttpErrors.InternalServerError(err);
//       }
//     }
// }