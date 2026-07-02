import { Router } from "express";
import { 
    createRequest,
    getReceivedRequests,
    updateRequestStatus,
    getPendingCount
} from "../controllers/requestController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = Router();


router.post(
    "/",
    protect,
    createRequest
);


router.get(
    "/received",
    protect,
    getReceivedRequests
);

router.get(
    "/count",
    protect,
    getPendingCount
  );

router.patch(
    "/:id/status",
    protect,
    updateRequestStatus
);


export default router;