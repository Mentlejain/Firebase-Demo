// src/controllers/fcm-token.controller.ts
import { post, requestBody, HttpErrors, del } from '@loopback/rest';
import { FcmTokenManagement } from '../utils/fcm-token-management';

export class FcmTokenController {
  private FcmTokenManagement: FcmTokenManagement;

  constructor() {
    this.FcmTokenManagement = FcmTokenManagement.getInstance();
  }

  @post('/store-fcm-token')
  async storeFcmToken(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'FcmTokenManagementRequest',
              properties: {
                fcmToken: {type: 'string'},
                userId: {type: 'string'},
                timestamp: {type: 'string'},
              },
            },
            required: ['fcmToken', 'userId'],
          },
        },
      },
    ) fcmTokenRequest: any,
  ): Promise<any> {
    //check tokenmap and user map for these entries

    //if not present, add them
    //if present, update timestamp
    //return success
    try {
      await FcmTokenManagement.updateFcmToken(
        fcmTokenRequest.userId,
        fcmTokenRequest.fcmToken,
      );
      return {
        status: 'success',
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError(err);
    }
}

 @del('/delete-fcm-token')

  async deleteFcmToken(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'FcmTokenManagementRequest',
              properties: {
                fcmToken: {type: 'string'},
              },
            },
            required: ['fcmToken'],
          },
        },
      },
    ) fcmTokenRequest: any,
  ): Promise<any> {
    try {
      await FcmTokenManagement.deleteFcmToken(
        fcmTokenRequest.fcmToken
      );
      return {
        status: 'success',
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError(err);
    }
  }
}
