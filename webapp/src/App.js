import React, { useState } from 'react';
import { fcmToken, fcmPromise } from './messaging_init_in_sw';

const App = () => {
  const [notificationType, setNotificationType] = useState('');

  const handleSendNotification = async () => {
    try {
      // Ensure permission is granted before proceeding
      await fcmPromise;

      // Continue with sending the push notification
      fetch('http://localhost:3000/push-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Push Notification: ${notificationType}`,
          body: `This is a test push notification for ${notificationType}.`,
          targetToken: fcmToken,
        }),
      });

    } catch (error) {
      console.error('Error:', error.message);
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
