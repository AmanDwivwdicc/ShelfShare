import {Router} from "express";
import {protect} from "../middleware/authMiddleware.js";

import {
getMyConversations
} from "../controllers/conversationController.js";


const router = Router();


router.get(
"/",
protect,
getMyConversations
);


export default router;