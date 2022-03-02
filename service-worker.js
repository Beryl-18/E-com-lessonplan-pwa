var cacheName = 'lesson-main-v1';
var cacheFiles = [
  'index.html',
  'server.js',
  'service-worker.js',
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
  'images/icon-512.png',
  'images/math.jpg',
  'images/music.jpg',
  'images/pottery.jpg',
  'images/soccer.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
      caches.open(cacheName).then((cache) => {
          console.log("[Service Worker] Caching all the files");
          return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener( 'fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch (e.request).then(function (response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request,response.clone());
                    return response;
                })

            })
        })
    )
})