var cacheName = 'lesson-v1';
var cacheFiles = [
  'index.html',
  'server.js',
  'package.json',
  'package-lock.json',
  'stylesheet.css',
  'lesson.webmanifest',
  'images/biology.jpg',
  'images/chemistry.jpg',
  'images/cricket.jpg',
  'images/culinary.jpg',
  'images/culinary.jps.jpeg',
  'images/finance.jpg',
  'images/french.jpg',
  'images/icon.png',
  'images/math.jpg',
  'images/music.jpg',
  'images/pottery.jpg',
  'images/soccer.png'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
      cache.open(cacheName).then((cache) =>{
          console.log('[Service Worker] caching all files');
          return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener('fetch', (e) => {
  console.log("[Service Worker] fetched resource"+e.request.url);
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    //checking if files exist
    caches.match(e.request).then(function (r) {
      console.log("[Service Worker] fetching resource :"+e.request.url );
      return r;
    }
  ));
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch (e.request).then (function (response){
        return caches.open(cacheName).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        })
      })
    })
  )
});