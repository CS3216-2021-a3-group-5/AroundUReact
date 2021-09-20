var CACHE_HOME = "home-cache";
var urlsToCache = ['/', '/promo'];

self.addEventListener("install", async (event) => {
  console.log("Caching");
	event.waitUntil(
		caches.open(CACHE_HOME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
  console.log("fetching from cache");
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
