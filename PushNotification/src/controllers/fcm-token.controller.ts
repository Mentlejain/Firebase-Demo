// src/controllers/fcm-token.controller.ts
import { post, requestBody, HttpErrors } from '@loopback/rest';
import { FcmTokenStorage } from '../utils/fcm-token-storage';
import { FcmTokenData } from '../utils/fcm-token-storage';

export class FcmTokenController {
  private fcmTokenStorage: FcmTokenStorage;

  constructor() {
    this.fcmTokenStorage = FcmTokenStorage.getInstance({});
  }

  @post('/store-fcm-token')
  //this api receives fcmtoken, orgid, userid and role and stores it in a csv file and compares from it
  async storeFcmToken(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'FcmTokenRequest',
              properties: {
                fcmToken: {type: 'string'},
                orgid: {type: 'string'},
                userid: {type: 'string'},
                role: {type: 'string'},
              },
            },
            required: ['fcmToken', 'orgid', 'userid', 'role'],
          },
        },
      },
    ) fcmTokenRequest: any,
  ): Promise<any> {
    //store the fcm token in csv file token.csv
    const result = this.fcmTokenStorage.storeFcmToken(fcmTokenRequest);
    if (!result) {
      throw new HttpErrors.InternalServerError('Failed to store fcm token');
    }
    return {
      success: true,
      response: {
        message: 'Successfully stored fcm token',
      },
    };
  }
}
