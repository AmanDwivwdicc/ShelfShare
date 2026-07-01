import {Router} from "express";
import {protect} from "../middleware/authMiddleware.js";

import {
getMessages,
sendMessage
} from "../controllers/chatController.js";


const router=Router();


router.get("/:id",protect,getMessages);


router.post("/:id",protect,sendMessage);


export default router;