var CACHE_HOME = "home-cache";
var urlsToCache = [
	"/",
	"/static/css/main.8bef2b5f.chunk.css",
// 	"/static/js/Screens/Buyer/Main/Indicator.js",
// 	"/static/js/Screens/Buyer/Main/MainScreen.js",
// 	"/static/js/Screens/Buyer/Main/PromoListItem.js",
// 	"/static/js/Screens/Buyer/Main/PromoOverlay.js",
// 	"/static/js/Screens/Buyer/Main/RangeSelector.js",
// 	"/static/js/Screens/Buyer/Promo/PromoScreen.js",
// 	"/static/js/Screens/SharedComponents/CategorySelector.js",
// 	"/static/js/assets/Indicator_Beauty_Wellness.png",
// 	"/static/js/assets/Indicator_Electronics.png",
// 	"/static/js/assets/Indicator_Fashion.png",
// 	"/static/js/assets/Indicator_Food.png",
// 	"/static/js/assets/Indicator_Others.png",
// 	"/static/js/assets/Indicator_Selected.png",
// 	"/static/js/assets/Logo_Words.png",
// 	"/static/js/App.js",
// 	"/static/js/ScrollToTop.js",
// 	"/static/js/constants.js",
// 	"/static/js/index.js",
// 	"/static/js/serviceWorkerRegistration.js",
	
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
				return cache.addAll(urlsToCache);
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
