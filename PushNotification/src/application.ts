import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import * as admin from 'firebase-admin';
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

import fs from 'node:fs';

export {ApplicationConfig};

export class PushNotificationApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);
    const ProjectConfig = JSON.parse(fs.readFileSync("./shastacloud-1337-firebase-adminsdk-8qzil-70c9b44014.json").toString())
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Set up Firebase Admin
    
    const firebaseAdminConfig = {
      credential: admin.credential.cert(ProjectConfig),
    };

    const firebaseAdminApp = admin.initializeApp(firebaseAdminConfig);

    this.bind('firebaseAdmin').to(firebaseAdminApp);

    this.bind('lastActiveUser').toDynamicValue(() => {
      return {};
    }).inScope(BindingScope.SINGLETON);

  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(firebaseAdminApp);

  const registrationTokens = [
    'eSs-NSZM9IQ1FTCe-ToF6w:APA91bHdoXpTDw4XprIvjH7iLHLo5M4PeCpF6DBS72hT_n5Hsods7OcapR6jXGQbH3w1VQt9MjShkur6dOUNPyCsJ-Wg7w__HyS69djyhuv2-kM_UeJ8IXWimKJssLvsM4RgoEE28jEw',
    'f6NoUKUEJNvndiK5_Ybg7D:APA91bEQIHP-d7gnYk3OGOknE-GPhQcBq4s_bZ-ZlcWCa8nB23huM0XjNUti46jwUxQ9hlbclRwJ6fhsHPSC3kAJs6Ert9shBpyPvLs_y4c302jO3sH8bU0d8-8QRu6VTKU8eMsIwWjj'
  ];
  
  // Subscribe the devices corresponding to the registration tokens to the
  // topic.
  // messaging.subscribeToTopic(registrationTokens, "broadcast")
  //   .then((response) => {
  //     // See the MessagingTopicManagementResponse reference documentation
  //     // for the contents of response.
  //     console.log('Successfully subscribed to topic:', response);
  //   })
  //   .catch((error) => {
  //     console.log('Error subscribing to topic:', error);
  //   });

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
