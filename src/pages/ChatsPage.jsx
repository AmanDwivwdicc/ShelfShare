import {useEffect,useState} from "react";
import {conversationAPI} from "../api/services";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function ChatsPage(){

    const {user}=useAuth();
const [chats,setChats]=useState([]);



useEffect(()=>{


conversationAPI
.getMyConversations()
.then(res=>{

console.log("Chats:",res.data.conversations);

setChats(res.data.conversations);

});


},[]);



return (

<div className="min-h-screen bg-cream px-6 py-10">


<h1 className="font-serif text-4xl font-bold">
💬 My Chats
</h1>



<div className="mt-8 grid gap-5">


{
chats.length===0 ?

<p className="text-ink-light">
No chats yet
</p>


:


chats.map(chat=>(


<Link

key={chat._id}

to={`/chat/${chat._id}`}

className="bg-white p-5 rounded-xl shadow"

>


<h2 className="font-bold text-xl">

{
chat.users
.filter(u=>u._id !== user.id)
.map(u=>u.name)
}

</h2>


<p className="text-gray-500">
Open conversation
</p>


</Link>


))

}



</div>


</div>

)


}