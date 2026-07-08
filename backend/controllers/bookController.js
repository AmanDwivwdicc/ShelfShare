import Book from "../models/Book.js";
import {
  uploadToCloudinary,
  isCloudinaryConfigured,
} from "../config/cloudinary.js";

const formatBook = (book) => ({
  id: book._id,
  title: book.title,
  author: book.author,
  genre: book.genre,
  bookAge: book.bookAge,
  condition: book.condition,
  description: book.description,
  type: book.type,
  price: book.price,
  image: book.image,
  status: book.status,
  owner: book.owner
    ? {
        id: book.owner._id,
        name: book.owner.name,
      }
    : null,
  createdAt: book.createdAt,
});

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: "available" })
      .populate("owner", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      books: books.map(formatBook),
    });
  } catch (error) {
    console.error("Get books error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "owner",
      "name"
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book: formatBook(book),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    console.error("Get book error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      description,
      type,
      price,
      bookAge,
      condition,
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !description ||
      !type ||
      !bookAge ||
      !condition
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, author, genre, description, and type",
      });
    }

    if (!["exchange", "sell"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be either exchange or sell",
      });
    }

    const parsedPrice = price ? Number(price) : null;

    if (
      type === "sell" &&
      (parsedPrice === undefined || parsedPrice === null || parsedPrice <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Price is required for books listed for sale",
      });
    }

    let imageUrl = null;

    if (req.file) {
      if (!isCloudinaryConfigured()) {
        return res.status(500).json({
          success: false,
          message:
            "Image upload is not configured. Please set Cloudinary environment variables.",
        });
      }

      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError.message);
        return res.status(500).json({
          success: false,
          message: "Failed to upload book cover image",
        });
      }
    }

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      description: description.trim(),

      bookAge,
      condition,

      type,
      price: type === "sell" ? parsedPrice : null,
      image: imageUrl,
      owner: req.user._id,
      status: "available",
    });

    await book.populate("owner", "name");

    res.status(201).json({
      success: true,
      message: "Book listed successfully",
      book: formatBook(book),
    });
  } catch (error) {
    console.error("Create book error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create book listing",
    });
  }
};
export const getMyBooks = async (req, res) => {
  try {

    const books = await Book.find({
      owner: req.user._id
    })
    .populate("owner", "name")
    .sort({ createdAt: -1 });


    res.status(200).json({
      success:true,
      count:books.length,
      books:books.map(formatBook)
    });


  } catch(error){

    console.error("Get my books error:", error.message);

    res.status(500).json({
      success:false,
      message:"Failed to fetch your listings"
    });

  }
};
export const deleteBook = async(req,res)=>{

  try{
  
  const book = await Book.findById(req.params.id);
  
  
  if(!book){
  
  return res.status(404).json({
  success:false,
  message:"Book not found"
  });
  
  }
  
  
  
  if(book.owner.toString() !== req.user._id.toString()){
  
  return res.status(403).json({
  success:false,
  message:"You cannot delete this book"
  });
  
  }
  
  
  
  await Book.findByIdAndDelete(req.params.id);
  
  
  
  res.status(200).json({
  
  success:true,
  message:"Book removed successfully"
  
  });
  
  
  }
  catch(error){
  
  console.error("Delete book error:",error.message);
  
  
  res.status(500).json({
  
  success:false,
  message:"Failed to delete book"
  
  });
  
  
  }
  
  };
