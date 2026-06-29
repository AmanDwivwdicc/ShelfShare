import { Router } from "express";
import multer from "multer";
import {
  getBooks,
  getBookById,
  createBook,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadBookImage } from "../middleware/uploadMiddleware.js";

const router = Router();

const handleImageUpload = (req, res, next) => {
  uploadBookImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Image must be smaller than 5MB",
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
};

router.get("/", protect, getBooks);
router.get("/:id", protect, getBookById);
router.post("/", protect, handleImageUpload, createBook);

export default router;
