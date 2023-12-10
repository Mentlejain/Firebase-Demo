const admin = {
  orgId: 1000,
  userId: 101,
  role: 'admin',
};
const finance = {
  orgId: 1001,
  userId: 102,
  role: 'finance',
};

const service = {
  orgId: 1002,
  userId: 103,
  role: 'service',
};

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

      console.log(event.data.json());

      // Check if credentials are available
      if ((admin && admin.orgId && admin.userId && admin.role) || 
          (finance && finance.orgId && finance.userId && finance.role) || 
          (service && service.orgId && service.userId && service.role)) {

        const notification = event.data.json();
        const options = {
          body: notification.notification.body,
          icon: 'https://shastacloud-1337.firebaseapp.com/favicon.ico',
          image: 'https://cdn.theorg.com/ae5f72ea-087a-4b17-9aa9-9da173342bb6_medium.jpg',
          // Include other options...
        };

        if (admin && admin.role === 'admin' && admin.orgId === notification.data.orgId) {
          return client.showNotification(notification.notification.title, options);
        } else if (finance && finance.role === 'finance' && finance.orgId === notification.data.orgId) {
          return client.showNotification(notification.notification.title, options);
        } else if (service && service.role === 'service' && 
                   service.orgId === notification.data.orgId && 
                   service.userId === notification.data.userId) {
          return client.showNotification(notification.notification.title, options);
        } else {
          console.log('Notification not for this user');
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
