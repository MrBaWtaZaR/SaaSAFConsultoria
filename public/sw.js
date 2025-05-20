self.addEventListener('install', function(event) {
  console.log('Service Worker instalado com sucesso');
  event.waitUntil(
    caches.open('af-consultoria-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/dashboard',
        '/offline.html',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker ativado com sucesso');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('af-consultoria-') && cacheName !== 'af-consultoria-v1';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
        // Não armazenar em cache requisições para APIs ou outras requisições dinâmicas
        if (!event.request.url.includes('/api/') && !event.request.url.includes('/dashboard/api/')) {
          return caches.open('af-consultoria-v1').then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        }
        return response;
      }).catch(function() {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
}); 