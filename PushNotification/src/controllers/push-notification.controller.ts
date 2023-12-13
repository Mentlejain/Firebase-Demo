import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  post,
  response,
  requestBody,
  ResponseObject,
} from '@loopback/rest';
import * as admin from 'firebase-admin';
import fs from 'node:fs';
import { request } from 'http';
import { FcmTokenData } from '../utils/fcm-token-storage';

export class PushNotificationController {
    constructor(@inject('firebaseAdmin') private firebaseAdmin: admin.app.App) {}
  
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

      const index = tokenData.findIndex(
        (entry:FcmTokenData) => entry.fcmToken === notification.targetToken
      );
      //get the orgid, userid and role from tokenData
      const orgid = tokenData[index].orgid;
      const userid = tokenData[index].userid;
      const role = tokenData[index].role;
      console.log(orgid, userid, role);
      
      const payload: admin.messaging.Message = {
        notification: {
          title: notification.title,
          body: JSON.parse(notification.body).message,
          imageUrl: notification.imageUrl,
        },
        data: {
          orgid: orgid,
          userid: userid,
          role: role,
        },
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

    @post('/push-notifications')
    @response(200, {
      description: 'Send push notifications',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'PushNotificationsResponse',
            properties: {
              success: { type: 'boolean' },
              response: { type: 'object' },
            },
          },
        },
      },
    })
    async sendPushNotifications(
      @requestBody({
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'PushNotificationsRequest',
              properties: {
                groupName: { type: 'string' },
                title: { type: 'string' },
                body: { type: 'string' },
                imageUrl: { type: 'string' },
              },
            },
            required: ['groupName', 'title', 'body'],
          },
        },
      })
      notification: any,
    ): Promise<any> {
      // Use the FCM SDK to send push notifications
      const messaging = this.firebaseAdmin.messaging();
//retriece the tokens from token.csv and store in registrationTokens
      const tokenData = JSON.parse(fs.readFileSync("./src/repositories/token.json").toString())
      
      const registrationTokens = tokenData.map(
        (entry:FcmTokenData) => entry.fcmToken
      );
  
      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
          imageUrl: notification.imageUrl,
        },
        tokens: registrationTokens ,
      };
  
      const options: admin.messaging.MessagingOptions = {
        priority: 'high',
      };
  
      messaging.sendEachForMulticast(message)
  .then((response) => {
    if (response.failureCount > 0) {
      const failedTokens: string | any[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
      });
      console.log('List of tokens that caused failures: ' + failedTokens);
    }
  });
  
      return {
        success: true,
        response,
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