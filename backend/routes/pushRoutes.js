import express from "express";
import { saveSubscription } from "../controllers/pushController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", protect, saveSubscription);

export default router;