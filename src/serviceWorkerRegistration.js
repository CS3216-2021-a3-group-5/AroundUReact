export default function ServiceWorkerRegistration() {
  if ("serviceWorker" in navigator) {
    const swPath = `${process.env.PUBLIC_URL}/service-worker.js`;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(swPath).then(() => {
        console.log("Service worker registered");
      });
    });
  }
}