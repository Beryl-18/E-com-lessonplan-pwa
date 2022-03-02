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

