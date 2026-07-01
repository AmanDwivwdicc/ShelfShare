import Book from "../models/Book.js";
import Request from "../models/Request.js";


// CREATE REQUEST (User requests a book)
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

      {
        path:"book",
        select:"title author image"
      },

      {
        path:"requester",
        select:"name email"
      },

      {
        path:"owner",
        select:"name email"
      }

    ]);



    res.status(201).json({

      success:true,

      message:"Request sent successfully",

      request

    });



  } catch(error){


    if(error.name === "CastError"){

      return res.status(404).json({

        success:false,
        message:"Book not found"

      });

    }



    console.error(
      "Create request error:",
      error.message
    );


    res.status(500).json({

      success:false,
      message:"Failed to create request"

    });


  }
};





// GET REQUESTS RECEIVED BY BOOK OWNER
export const getReceivedRequests = async (req,res)=>{

  try{

    const requests = await Request.find({

      owner:req.user._id,
      status:"pending"

    })

    .populate({
      path:"book",
      select:"title author image"
    })

    .populate(
      "requester",
      "name email"
    )

    .sort({
      createdAt:-1
    });


    // remove requests whose book was deleted
    const validRequests = requests.filter(
      request => request.book !== null
    );


    res.json({

      success:true,
      requests:validRequests

    });


  }
  catch(error){

    console.error(
      "Get requests error:",
      error.message
    );


    res.status(500).json({

      success:false,
      message:"Failed to fetch requests"

    });

  }

};






// ACCEPT / REJECT REQUEST
export const updateRequestStatus = async(req,res)=>{


  try{


    const {status}=req.body;



    if(!["accepted","rejected"].includes(status)){


      return res.status(400).json({

        success:false,
        message:"Invalid status"

      });


    }



    const request = await Request.findById(
      req.params.id
    );



    if(!request){


      return res.status(404).json({

        success:false,
        message:"Request not found"

      });


    }




    // only owner can accept/reject
    if(
      request.owner.toString()
      !==
      req.user._id.toString()

    ){


      return res.status(403).json({

        success:false,
        message:"Not authorized"

      });


    }



    request.status=status;


    await request.save();




    res.json({

      success:true,

      message:`Request ${status}`,

      request

    });



  }catch(error){


    console.error(
      "Update request error:",
      error.message
    );


    res.status(500).json({

      success:false,
      message:"Failed updating request"

    });


  }

};