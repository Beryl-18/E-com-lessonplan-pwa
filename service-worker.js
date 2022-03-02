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
  'images/soccer.png',
  'service-worker.js'
];

self.addEventListener('install', (e) =>{
  console.log('[Service Worker] Install');
  e.waitUntil(
      caches.open(cacheName).then((cache) => {
          console.log("[Service Worker] Caching all the files");
          return cache.addAll(cacheFiles);
      })
  )
})

self.addEventListener('fetch', function (e) {
    e.respondWith(
        // check if the cache has the file
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: '
              + e.request.url);
            // 'r' is the matching file if it exists in the cache
    return r })
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