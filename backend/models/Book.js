import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["exchange", "sell"],
      required: [true, "Type is required"],
    },
    price: {
      type: Number,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "pending", "sold", "exchanged"],
      default: "available",
    },
    bookAge: {
      type: String,
      required: true,
    },
    
    condition: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
