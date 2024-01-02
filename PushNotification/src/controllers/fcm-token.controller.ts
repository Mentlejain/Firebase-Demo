// src/controllers/fcm-token.controller.ts
import { post, requestBody, HttpErrors } from '@loopback/rest';
import { FcmTokenStorage } from '../utils/fcm-token-storage';

export class FcmTokenController {
  private fcmTokenStorage: FcmTokenStorage;

  constructor() {
    this.fcmTokenStorage = FcmTokenStorage.getInstance();
  }

  @post('/store-fcm-token')
  async storeFcmToken(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'FcmTokenStorageRequest',
              properties: {
                fcmToken: {type: 'string'},
                orgId: {type: 'string'},
                userId: {type: 'string'},
                role: {type: 'string'},
              },
            },
            required: ['fcmToken', 'orgId', 'userId', 'role'],
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
      await FcmTokenStorage.updateFcmToken(
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
}
