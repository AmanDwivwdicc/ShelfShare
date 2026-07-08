import PushSubscription from "../models/PushSubscription.js";

export const saveSubscription = async (req, res) => {
  try {
    const subscription = req.body;

    await PushSubscription.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        subscription,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Subscription saved",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed saving subscription",
    });

  }
};