
self.addEventListener('push', function(event) {  
  console.log('Push event received', event);
  var notification = event.data.json();
  console.log('Push event notification', notification);
  const options = {
    body: notification.notification.body,
    icon: 'https://shastacloud-1337.firebaseapp.com/favicon.ico',
    image: "https://cdn.theorg.com/ae5f72ea-087a-4b17-9aa9-9da173342bb6_medium.jpg", // Include image property
    // Other options...
  };

  event.waitUntil(
    self.registration.showNotification(notification.notification.title, options)
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