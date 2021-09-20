export default function ServiceWorkerRegistration() {
  const swPath = `${process.env.PUBLIC_URL}/service-worker.js`;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(swPath).then(() => {
        console.log("Service worker registered");
      });
    });
  }
}