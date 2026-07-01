import Conversation from "../models/Conversation.js";


export const getMyConversations = async(req,res)=>{

try{


const conversations =
await Conversation.find({

users:req.user._id

})
.populate(
"users",
"name email"
)
.sort({
createdAt:-1
});



res.json({

success:true,

conversations

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed fetching conversations"

});


}

};