import webpush from "../config/webPush.js";
import PushSubscription from "../models/PushSubscription.js";

export const sendPushNotification = async (
  userId,
  title,
  body,
  url = "/dashboard"
) => {
  try {
    const pushSub = await PushSubscription.findOne({ user: userId });

    if (!pushSub) {
      console.log("No push subscription found.");
      return;
    }

    await webpush.sendNotification(
      pushSub.subscription,
      JSON.stringify({
        title,
        body,
        url,
      })
    );

    console.log("Push notification sent.");

  } catch (err) {
    console.error("Push notification error:", err.message);
  }
};