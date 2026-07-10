import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import { sendPushNotification } from "../utils/sendPushNotification.js";

export const getMessages=async(req,res)=>{


try{

    const conversation = await Conversation.findById(req.params.id);

if(!conversation){
 return res.status(404).json({
 success:false,
 message:"Conversation not found"
 });
}

const messages =
await Message.find({

conversation:req.params.id

})
.populate(
"sender",
"name"
)
.sort({
createdAt:1
});


res.json({

success:true,
messages

});


}
catch(error){


res.status(500).json({

success:false,
message:"Failed fetching messages"

});


}

};






export const sendMessage=async(req,res)=>{


try{


const message =
await Message.create({

conversation:req.params.id,

sender:req.user._id,

text:req.body.text

});

const conversation = await Conversation.findById(req.params.id)
  .populate("users", "name");

const receiver = conversation.users.find(
  (user) => user._id.toString() !== req.user._id.toString()
);

if (receiver) {
  await sendPushNotification(
    receiver._id,
    "💬 New message on ShelfShare",
    `${req.user.name}: ${req.body.text.substring(0, 60)}${
  req.body.text.length > 60 ? "..." : ""
}`,
    `/chat/${conversation._id}`
  );
}



res.json({

success:true,

message

});


}
catch(error){


res.status(500).json({

success:false,

message:"Failed sending message"

});


}

};