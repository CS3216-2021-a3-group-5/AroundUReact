var CACHE_HOME = "home-cache";
var urlsToCache = [
	"/",
	"/static/js/bundle.js",
	"/static/js/vendors~main.chunk.js",
	"/static/js/main.chunk.js",
	"/manifest.json",
	"/logo_512.png",
	"/static/media/Logo_Words.e3e56c3d.png",
	"/Logo_192.png",
	"/static/media/Splashscreen_Lite.2875cf15.png"
];

self.addEventListener("install", async (event) => {
	console.log("Caching");
	event.waitUntil(
		caches.open(CACHE_HOME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
	if (String(event.request.url).endsWith("/nearbystores")) {
		return
	}
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
