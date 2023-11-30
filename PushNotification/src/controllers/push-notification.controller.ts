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
import { request } from 'http';

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

      //extract fcm token from header
      const payload: admin.messaging.Message = {
        notification: {
          title: notification.title,
          body: notification.body,
          imageUrl: notification.imageUrl,
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