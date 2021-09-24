var CACHE_HOME = "home-cache";
var urlsToCache = [
	"/static/css/main.8bef2b5f.chunk.css",
	"/static/js/main.b1f900f4.chunk.js",
	"/static/js/2.1d607b2b.chunk.js",
	"/manifest.json",
	"/logo_512.png",
	"/static/media/Logo_Words.e3e56c3d.png",
	"/Logo_192.png",
	"/splashscreens/640_1136.jpg",
	"/splashscreens/750_1334.jpg",
	"/splashscreens/828_1792.jpg",
	"/splashscreens/1125_2436.jpg",
	"/splashscreens/1242_2208.jpg",
	"/splashscreens/1242_2688.jpg",
	"/splashscreens/1536_2048.jpg",
	"/splashscreens/1668_2224.jpg",
	"/splashscreens/1668_2388.jpg",
	"/splashscreens/2048_2732.jpg",
];

self.addEventListener("install", async (event) => {
	console.log("Installing");
	event.waitUntil(
		caches
			.open(CACHE_HOME)
			.then((cache) => {
				urlsToCache.forEach((url) =>
					cache.add(url).catch((err) => console.log(url))
				);
				return cache.add("/");
			})
			.catch((err) => console.log(err))
	);
});

self.addEventListener("fetch", (event) => {
	if (String(event.request.url).endsWith("/nearbystores")) {
		return;
	}
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response;
			}
			return fetch(event.request).catch((err) => console.log(err));
		})
	);
});
