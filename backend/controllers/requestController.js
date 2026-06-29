import Book from "../models/Book.js";
import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "This book is no longer available",
      });
    }

    if (book.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own book",
      });
    }

    const existingRequest = await Request.findOne({
      book: bookId,
      requester: req.user._id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending request for this book",
      });
    }

    const request = await Request.create({
      book: bookId,
      requester: req.user._id,
      owner: book.owner,
      status: "pending",
    });

    await request.populate([
      { path: "book", select: "title author" },
      { path: "requester", select: "name email" },
      { path: "owner", select: "name email" },
    ]);

    res.status(201).json({
      success: true,
      message: "Request sent successfully",
      request: {
        id: request._id,
        book: request.book,
        requester: request.requester,
        owner: request.owner,
        status: request.status,
        createdAt: request.createdAt,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    console.error("Create request error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create request",
    });
  }
};
