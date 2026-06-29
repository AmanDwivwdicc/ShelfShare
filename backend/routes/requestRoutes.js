import { Router } from "express";
import { createRequest } from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createRequest);

export default router;
