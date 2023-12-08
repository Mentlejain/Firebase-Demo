import React, { useState, useEffect } from 'react';
import { fcmToken, fcmPromise } from './messaging_init_in_sw';

const App = () => {
  const [notificationType, setNotificationType] = useState('');
  const [orgId, setOrgId] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Check if the browser supports service workers
    if ('serviceWorker' in navigator) {
      // Register the service worker
      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage({ 'orgid': orgId, 'userid': userId , 'role': role});
      });
    }
  }, );

  const handleSetCredentials = async () => {
    try {
      await fetch('http://localhost:3000/store-fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgid: orgId, userid: userId,
          role, fcmToken,
        }),
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleSendNotification = async () => {
    try {
      // Ensure permission is granted before proceeding
      await fcmPromise;

      let jsonString = ''; // Initialize an empty JSON string

      // Set category, message, orgId, userId, and role based on the button clicked
      switch (notificationType) {
        case 'AP went down':
          jsonString = JSON.stringify({
            message: `Test notification for ${notificationType}`,
            category: 'AP Maintenance',
            orgid: orgId,
            userid: userId,
            role: role,
          });
          break;
        case 'Quotation Accepted':
          jsonString = JSON.stringify({
            message: `Test notification for ${notificationType}`,
            category: 'Marketplace',
            orgid: orgId,
            userid: userId,
            role: role,
          });
          break;
        case 'Transaction Completed':
          jsonString = JSON.stringify({
            message: `Test notification for ${notificationType}`,
            category: 'Marketplace',
            orgid: orgId,
            userid: userId,
            role: role,
          });
          break;
        case 'Firmware updated':
          jsonString = JSON.stringify({
            message: `Test notification for ${notificationType}`,
            category: 'Controller',
            orgid: orgId,
            userid: userId,
            role: role,
          });
          break;
        default:
          // Handle the default case if needed
      }

      //handle update credentials
      console.log(jsonString);
      // Continue with sending the push notification
      await fetch('http://localhost:3000/push-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Push Notification: ${notificationType}`,
          body: jsonString, // Set the body to the JSON string
          targetToken: fcmToken,
        }),
      });


    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleSendCredentials = async () => {
    try {
      // Check if the browser supports service workers
      if ('serviceWorker' in navigator) {
        // Wait for the service worker to be ready
        const registration = await navigator.serviceWorker.ready;

        // Check if there's an active service worker
        if (registration.active) {
          // Data to send to the service worker (replace with your credentials)
          const credentialsData = {
            orgId: orgId,
            userId: userId,
            role: role,
          };

          // Send data to the service worker
          registration.active.postMessage(credentialsData);

          console.log('Credentials sent to service worker:', credentialsData);
        } else {
          console.warn('No active service worker found.');
        }
      } else {
        console.warn('Service workers are not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sending credentials:', error.message);
    }
  };

  return (
    <section className="hero is-fullheight is-info">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <h1 className="navbar-item title is-3">Push Notifications</h1>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="content">
                <h2 className="title is-4">Shasta Cloud Push Notifications Simulation</h2>
                <figure className="image is-4by3">
                  <img src='shasta-cloud.jpg' alt="Shasta Cloud" />
                </figure>
                <p className="subtitle is-6">
                  Open the console and click the button below to send a push notification.
                </p>
                <div className="field">
                  <label className="label">Organization ID:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter organization ID"
                      value={orgId}
                      onChange={(e) => setOrgId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">User ID:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter user ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                <label className="label">Role:</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select a role</option>
                      <option value="admin">Admin</option>
                      <option value="finance">Finance</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                </div>
              </div>
                <div className="buttons is-vertical">
                  <button
                    className={`button ${notificationType === 'AP went down' && 'is-primary'}`}
                    onClick={() => setNotificationType('AP went down')}
                  >
                    AP went down
                  </button>
                  <button
                    className={`button ${notificationType === 'Quotation Accepted' && 'is-primary'}`}
                    onClick={() => setNotificationType('Quotation Accepted')}
                  >
                    Quotation Accepted
                  </button>
                  <button
                    className={`button ${notificationType === 'Transaction Completed' && 'is-primary'}`}
                    onClick={() => setNotificationType('Transaction Completed')}
                  >
                    Transaction Completed
                  </button>
                  <button
                    className={`button ${notificationType === 'Firmware updated' && 'is-primary'}`}
                    onClick={() => setNotificationType('Firmware updated')}
                  >
                    Firmware updated
                  </button>
                </div>
                <button className="button is-primary" onClick={handleSendNotification}>
                  Send Push Notification
                </button>
                <button className="button is-primary" onClick={handleSetCredentials}>
                  Set Credentials
                </button>
                <button className="button is-primary" onClick={handleSendCredentials}>
                Send Credentials to Service Worker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container has-text-centered">
          <p className="subtitle is-6">© 2023 Your Company</p>
        </div>
      </div>
    </section>
  );
};

export default App;
