import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  post,
  response,
  requestBody,
  ResponseObject,
  param,
} from '@loopback/rest';
import * as admin from 'firebase-admin';
import fs from 'node:fs';
import { request } from 'http';
import { UserStorage } from '../utils/user-storage';
import { FcmTokenStorage } from '../utils/fcm-token-storage';

export class PushNotificationController {
  private FcmTokenStorage: FcmTokenStorage;
    constructor(@inject('firebaseAdmin') private firebaseAdmin: admin.app.App) {
      this.FcmTokenStorage = FcmTokenStorage.getInstance();
    }
  
    @post('/push-notification')

    @response(200, {
        description: 'Send push notification',
        content: {
            'application/json': {
            schema: {
                type: 'object',
                title: 'PushNotificationResponse',
                properties: {
                success: {type: 'boolean'},
                response: {type: 'object'},
                },
            },
            },
        },
        })
    async sendPushNotification(
      @requestBody(
        {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                title: 'PushNotificationRequest',
                properties: {
                  targetToken: {type: 'string'},
                  title: {type: 'string'},
                  body: {type: 'string'},
                  imageUrl: {type: 'string'},
                },
              },
              required: ['targetToken', 'title', 'body'],
            },
          },
        },
      ) notification: any,
    ): Promise<any> {
      // Use the FCM SDK to send push notifications
      const messaging = this.firebaseAdmin.messaging();
      
      // Assuming 'token' is the device token you want to send the notification to

      //send notification to fcm token
      console.log(notification)

      //get the json data from token.json for notification.targetToken
      const tokenData = JSON.parse(fs.readFileSync("./src/repositories/token.json").toString())
      console.log(tokenData)
      //get the index of the token in tokenData

      
      const payload: admin.messaging.Message = {
        notification: {
          title: notification.title,
          body: JSON.parse(notification.body).message,
          imageUrl: notification.imageUrl,
        },
        // data: {
        //   orgid: orgid,
        //   userid: userid,
        //   role: role,
        // },
        token: notification.targetToken,
      };
  
      const options: admin.messaging.MessagingOptions = {
        priority: 'high',
      };
  
      const response = await messaging.send(payload);
  
      return {
        success: true,
        response,
      };
    }
    @post('/register-group')
    @response(200, {
      description: 'Register group',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'RegisterGroupResponse',
            properties: {
              success: { type: 'boolean' },
              response: { type: 'object' },
            },
          },
        },
      },
    })
    async registerGroup(
      @requestBody({
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'RegisterGroupRequest',
              properties: {
                groupName: { type: 'string' },
                tokens: { type: 'string' },
              },
            },
            required: ['groupName', 'tokens'],
          },
        },
      })
      group: any,
    ): Promise<any> {
      // Use the FCM SDK to register a device group
      const messaging = this.firebaseAdmin.messaging();
  
      const response = await messaging
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

    @post('/push-notification-user/{userId}')
    @response(200, {
      description: 'Send push notification to org',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'PushNotificationOrgResponse',
            properties: {
              success: { type: 'boolean' },
              response: { type: 'object' },
            },
          },
        },
      },
    })
    async sendPushNotificationToUser(
      @param.path.number('userId') userId: number,
      @requestBody({
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'PushNotificationOrgRequest',
              properties: {
                title: { type: 'string' },
                body: { type: 'string' },
                imageUrl: { type: 'string' },
              },
            },
            required: ['title', 'body'],
          },
        },
      })
      notification: any,
    ): Promise<any> {
      const tokens = await FcmTokenStorage.getUserFcmTokens(userId)

      const messaging = this.firebaseAdmin.messaging();

      let message = {
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
      messaging.sendEachForMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });
      return {
        success: true,
      };

    }
    @post('/broadcast-push-notification')
    @response(200, {
      description: 'Broadcast push notification',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'BroadcastPushNotificationResponse',
            properties: {
              success: { type: 'boolean' },
              response: { type: 'object' },
            },
          },
        },
      },
    })
    async broadcastPushNotification(
      @requestBody({
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'BroadcastPushNotificationRequest',
              properties: {
                title: { type: 'string' },
                body: { type: 'string' },
                imageUrl: { type: 'string' },
              },
            },
            required: ['title', 'body'],
          },
        },
      })
      notification: any,
    ): Promise<any> {
      // Use the FCM SDK to broadcast push notifications
      const messaging = this.firebaseAdmin.messaging();
  
      const payload: admin.messaging.Message = {
        notification: {
          title: notification.title,
          body: notification.body,
          imageUrl: notification.imageUrl,
        },
        topic: 'broadcast', // You can subscribe devices to this topic in your app
      };
  
      const options: admin.messaging.MessagingOptions = {
        priority: 'high',
      };
  
      const response = await messaging.send(payload);
  
      return {
        success: true,
        response,
      };
    }
  }