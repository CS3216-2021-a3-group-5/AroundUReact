export default function ServiceWorkerRegistration() {
  if (process.env.NODE_ENV === 'production' && "serviceWorker" in navigator) {
    const swPath = `${process.env.PUBLIC_URL}/service-worker.js`;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(swPath).then(() => {
        console.log("Service worker registered");
      });
    });
  }
}