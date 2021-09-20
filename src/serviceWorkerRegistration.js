export default function ServiceWorkerRegistration() {
  if (process.env.NODE_ENV === 'production' && "serviceWorker" in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) { return }

    const swPath = `${process.env.PUBLIC_URL}/service-worker.js`;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(swPath).then(() => {
        console.log("Service worker registered");
      });
    });
  }
}