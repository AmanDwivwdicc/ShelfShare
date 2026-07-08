import { pushAPI } from "../api/services";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function registerForPushNotifications() {
  if (!("serviceWorker" in navigator))
    return;

  if (!("PushManager" in window))
    return;

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Please allow notifications.");
    return;
  }

  const registration =
    await navigator.serviceWorker.register("/sw.js");

  let subscription =
    await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription =
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          urlBase64ToUint8Array(
            import.meta.env.VITE_VAPID_PUBLIC_KEY
          ),
      });
  }

  await pushAPI.subscribe(subscription);

  console.log("Push subscription saved.");
}
console.log(import.meta.env.VITE_VAPID_PUBLIC_KEY);