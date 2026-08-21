const cacheName = self.location.pathname
const pages = [

  "/posts/note/",
    "/posts/inst/",
    "/posts/note/edit/RZ_notepadpp_note/",
    "/posts/note/markdown/markdown-note/",
    "/posts/note/git/git-page-note/",
    "/posts/inst/ad9361/RZ_AD9361_No-Os_pl_rw/",
    "/posts/note/git/git-note/",
    "/",
    "/posts/",
    "/tags/",
    "/book.min.d39bd0ea715eb7778491c8baa34c2b7e0f1ba062ced201b1c5f9fbe5e85ef74f.css",
  "/en.search-data.min.062c39e42875803f73039f8a013aea6af2b3d9d74cc9b2fad7a8f8a5ef82ae3d.json",
  "/en.search.min.3eb0d5730242023de21014d8c24dcdb8d2925c69d454c38921f6161feb7d0ebf.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
