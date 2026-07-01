import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema(
{

users:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
]

},
{
timestamps:true
}

);


// prevent duplicate user-user chats

conversationSchema.index(
{
users:1
},
{
unique:true
}
);



const Conversation =
mongoose.model(
"Conversation",
conversationSchema
);


export default Conversation;