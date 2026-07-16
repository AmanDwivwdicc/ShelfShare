import Book from "../models/Book.js";
import Request from "../models/Request.js";
import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
import { sendEmailNodemailer as sendEmail } from "../utils/sendEmailNodemailer.js";
import { sendPushNotification } from "../utils/sendPushNotification.js";
// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {

    const { bookId } = req.body;


    if (!bookId) {
      return res.status(400).json({
        success:false,
        message:"Book ID is required"
      });
    }


    const book = await Book.findById(bookId);


    if(!book){
      return res.status(404).json({
        success:false,
        message:"Book not found"
      });
    }


    if(book.status !== "available"){
      return res.status(400).json({
        success:false,
        message:"This book is no longer available"
      });
    }


    if(book.owner.toString() === req.user._id.toString()){

      return res.status(400).json({
        success:false,
        message:"You cannot request your own book"
      });

    }



    const existingRequest = await Request.findOne({

      book:bookId,
      requester:req.user._id,
      status:"pending"

    });



    if(existingRequest){

      return res.status(400).json({

        success:false,
        message:"You already have a pending request"

      });

    }




    const request = await Request.create({

      book:bookId,
      requester:req.user._id,
      owner:book.owner,
      status:"pending"

    });



    await request.populate([
      {
        path: "book",
        select: "title author image"
      },
      {
        path: "requester",
        select: "name"
      },
      {
        path: "owner",
        select: "name"
      }
    ]);

    try{

      await sendEmail({
      
      to:request.owner.email,
      
      subject:"📚 New request on ShelfShare",
      
      html:`
      
      <h2>Hello ${request.owner.name}</h2>
      
      <p>${request.requester.name} has requested your book.</p>
      
      <h3>${request.book.title}</h3>
      
      <br>
      
      <a href="https://shelf-share-taupe.vercel.app/notifications">
      
      View Request
      
      </a>
      
      `
      
      });
      
      }
      catch(err){
      
      console.log(err);
      
      }

    await sendPushNotification(
      request.owner._id,
      "📚 New Book Request",
      `${request.requester.name} requested "${request.book.title}"`,
      "/notifications"
    );

    res.status(201).json({

      success:true,
      message:"Request sent successfully",
      request

    });



  } catch(error){

    console.log(error);

    res.status(500).json({

      success:false,
      message:"Failed creating request"

    });

  }

};





// GET RECEIVED REQUESTS

export const getReceivedRequests = async(req,res)=>{

try{


const requests = await Request.find({

owner:req.user._id,
status:"pending"

})

.populate(
"book",
"title author image"
)

.populate(
"requester",
"name email"
)

.sort({
createdAt:-1
});



const validRequests =
requests.filter(
request=>request.book !== null
);



res.json({

success:true,
requests:validRequests

});



}
catch(error){

console.log(error);


res.status(500).json({

success:false,
message:"Failed fetching requests"

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



const request = await Request.findById(req.params.id)
  .populate("book", "title")
  .populate("requester", "name email");



if(!request){

return res.status(404).json({

success:false,
message:"Request not found"

});

}




// only owner can decide

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



let conversation = null;



// create ONE chat between two users

if (status === "accepted") {

  const users = [
    request.owner.toString(),
    request.requester._id.toString()
  ].sort();

  conversation = await Conversation.findOne({
    users: {
      $all: users,
      $size: 2
    }
  });

  if (!conversation) {
    conversation = await Conversation.create({
      users
    });
  }
  await sendPushNotification(
    request.requester._id,
    "🎉 Request Accepted",
    `Your request for "${request.book.title}" has been accepted!`,
    "/chats"
  );

  try {

    await sendEmail({

      to: request.requester.email,

      subject: "🎉 Your ShelfShare request has been accepted!",

      html: `
        <h2>🎉 Congratulations!</h2>

        <p>Your request for <strong>${request.book.title}</strong> has been accepted.</p>

        <p>You can now chat with the owner.</p>

        <a href="https://shelf-share-taupe.vercel.app/chats">
          Open Chat
        </a>
      `

    });

  } catch (err) {

    console.error(err);

  }

}


  if(status==="rejected"){
  
    try{

      await sendEmail({
      
        to: request.requester.email,
      
      subject:"Book Request Rejected",
      
      html:`
      
      <h2>Your request was declined.</h2>
      
      <p>Don't worry, there are many more books waiting for you.</p>
      
      <a href="https://shelf-share-taupe.vercel.app/dashboard">
      
      Browse Books
      
      </a>
      
      `
      
      });
      
      }
      catch(err){
      
      console.log(err);
      
      }
    await sendPushNotification(
      request.requester._id,
      "📚 Book Unavailable",
      `Your request for "${request.book.title}" couldn't be accepted. Explore more books on ShelfShare!`,
      "/dashboard"
    );
  
  }




res.json({

success:true,

message:`Request ${status}`,

request,

conversationId:
conversation
?
conversation._id.toString()
:
null


});




}
catch(error){


console.log("Update error:",error);


res.status(500).json({

success:false,

message:"Failed updating request"

});


}


};

export const getPendingCount = async (req, res) => {
  try {

    const count = await Request.countDocuments({
      owner: req.user._id,
      status: "pending"
    });

    res.json({
      success: true,
      count
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch notification count"
    });

  }
};