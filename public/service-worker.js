var CACHE_HOME = "home-cache";
var urlsToCache = ['/'];

self.addEventListener("install", async (event) => {
  console.log("Caching");
	event.waitUntil(
		caches.open(CACHE_HOME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
  	console.log("Fetching cache for " + event.request.url);
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});
