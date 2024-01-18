import * as admin from 'firebase-admin';
import { FcmTokenManagement } from './fcm-token-management';
import { FcmTokenRepository } from '../repositories/fcm-token.repository'; // Import your FcmTokenRepository
import { MulticastMessage } from 'firebase-admin/messaging';

export class PushNotification {
  private fcmTokenManagement: FcmTokenManagement;
  private messaging: admin.messaging.Messaging;
  private fcmTokenRepository: FcmTokenRepository;

  constructor(
    private firebaseAdmin: admin.app.App,
  ) {
    this.fcmTokenManagement = FcmTokenManagement.getInstance();
    this.messaging = this.firebaseAdmin.messaging();
    // this.fcmTokenRepository = fcmTokenRepository;
  }

  async sendPushNotification(notification: any): Promise<any> {
    console.log(notification);

    const tokenData = await this.fcmTokenRepository.find({
      where: { userId: notification.userId }, // Adjust the query based on your schema
    });

    console.log(tokenData);

    const payload: admin.messaging.Message = {
      notification: {
        title: notification.title,
        body: JSON.parse(notification.body).message,
        imageUrl: notification.imageUrl,
      },
      token: notification.targetToken,
    };

    const response = await this.messaging.send(payload);

    return {
      success: true,
      response,
    };
  }

  async registerGroup(group: any): Promise<any> {
    const response = await this.messaging
      .subscribeToTopic(group.tokens, group.groupName)
      .catch(error => {
        console.error('Failed to register group:', error);
        return error;
      });

    return {
      success: true,
      response,
    };
  }

  async sendPushNotificationToUser(userId: string, notification: any): Promise<any> {
    const tokens = await FcmTokenManagement.getUserFcmTokens(userId);

    const message: MulticastMessage = {
        notification: {
            title: notification.title,
            body: notification.body,
            imageUrl: notification.imageUrl,
        },
        data: {
            test: 'test',
        },
        tokens: tokens,
    };

    console.log('Sending push notification to user:', userId, 'with tokens:', tokens);
    this.messaging.sendEachForMulticast(message).then(response => {
      console.log(response.successCount + ' messages were sent successfully');
    });

    return {
      success: true,
    };
  }

  async broadcastPushNotification(notification: any): Promise<any> {
    const payload: admin.messaging.Message = {
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl,
      },
      topic: 'broadcast',
    };

    const response = await this.messaging.send(payload);

    return {
      success: true,
      response,
    };
  }
}