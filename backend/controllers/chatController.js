import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

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