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

self.addEventListener('push', function (event) {
  console.log(event.data.json());

    const notification = event.data.json();
    const options = {
      body: notification.notification.body,
      icon: 'https://shastacloud-1337.firebaseapp.com/favicon.ico',
      image: 'https://cdn.theorg.com/ae5f72ea-087a-4b17-9aa9-9da173342bb6_medium.jpg',
      // Include other options...
    };
    self.addEventListener('push', async function(event) {
      event.waitUntil(
          self.registration.showNotification(notification.notification.title, options)
      );
  });
  }
  );

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});
