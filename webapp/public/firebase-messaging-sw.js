let orgId = null;
let userId = null;
let role = null;

self.addEventListener('message', function (event) {
  console.log('SW Received Message: ' + event.data);
  if (event.data.orgId) {
    orgId = event.data.orgId;
  }
  if (event.data.userId) {
    userId = event.data.userId;
  }
  if (event.data.role) {
    role = event.data.role;
  }
});

self.addEventListener('push', function (event) {
  event.waitUntil(
    // Get all active clients
    self.clients.matchAll().then(clients => {
      // Find the client that sent the message
      const client = clients.find(client => client.id === event.source.id);

      // Check if credentials are available
      if (orgId && userId) {
        const notification = event.data.json();
        const options = {
          body: notification.notification.body,
          icon: 'https://shastacloud-1337.firebaseapp.com/favicon.ico',
          image: 'https://cdn.theorg.com/ae5f72ea-087a-4b17-9aa9-9da173342bb6_medium.jpg',
          // Include other options...
        };

        if (role === 'admin') {
          if (notification.data.orgId === orgId) {
            return client.showNotification(notification.notification.title, options);
          } else {
            console.log('Notification not for this org');
          }
        } else {
          if (notification.data.orgId === orgId && notification.data.userId === userId) {
            return client.showNotification(notification.notification.title, options);
          } else {
            console.log('Notification not for this user');
          }
        }
      }
    })
  );
});

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});
