import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD6UWWHVF0xh4TccXr58xRdP0LicT8Ln5M",
  authDomain: "shastacloud-1337.firebaseapp.com",
  projectId: "shastacloud-1337",
  storageBucket: "shastacloud-1337.appspot.com",
  messagingSenderId: "84706649851",
  appId: "1:84706649851:web:6f2596869539faaa95725e",
  measurementId: "G-70K58JPNX8"
};

let fcmToken = null;
let fcmPromise = null;

// Initialize Firebase app outside of the function
const app = initializeApp(firebaseConfig);

function requestPermission() {
  console.log("Requesting permission...");

  // Use the existing promise if it's still pending
  if (fcmPromise) {
    return fcmPromise;
  }

  
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      // Get the messaging object
      const messaging = getMessaging(app);

      // Get the FCM token
      getToken(messaging,{vapidKey:"BKHGmf8HwXU5XcdGHVS1SkkLwvlsX0f2PQeFYI9qx_8xW18txKOcLuG3dCNpkEhRCVjZuG5j2gh6Kd8BquldTjU"}).then((currentToken) => {
        if (currentToken) {
          console.log("Current FCM token:", currentToken);
          fcmToken = currentToken;
          fcmPromise = Promise.resolve(fcmToken);
        } else {
          console.log("Cannot get FCM token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

const subscribeToBroadcastTopic = async () => {
  const messaging = getMessaging();

  try {
    // Get the FCM token
    const currentToken = await getToken(messaging);
    
    // Subscribe the device to the 'broadcast' topic
    await messaging.subscribeToTopic(currentToken, 'broadcast');

    console.log(`Subscribed to 'broadcast' topic`);
  } catch (error) {
    console.error('Error subscribing to topic:', error);
  }
};

// Call the function to subscribe when needed
subscribeToBroadcastTopic();


requestPermission();

export { fcmToken, fcmPromise };