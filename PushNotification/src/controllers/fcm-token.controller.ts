// src/controllers/fcm-token.controller.ts
import { post, requestBody, HttpErrors } from '@loopback/rest';
import { FcmTokenStorage } from '../utils/fcm-token-storage';

export class FcmTokenController {
  private fcmTokenStorage: FcmTokenStorage;

  constructor() {
    this.fcmTokenStorage = FcmTokenStorage.getInstance();
  }

  @post('/fcm-tokens')
  async postFcmToken(@requestBody() fcmToken: { token: string }): Promise<{ success: boolean }> {
    const { token } = fcmToken;

    if (this.fcmTokenStorage.getTokens().includes(token)) {
      throw new HttpErrors.Conflict('Token already exists');
    }

    this.fcmTokenStorage.addToken(token);

    return { success: true };
  }
}
