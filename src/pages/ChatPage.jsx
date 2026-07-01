import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {chatAPI} from "../api/services";
import {useAuth} from "../context/AuthContext";


export default function ChatPage(){

const {id}=useParams();

const {user}=useAuth();


const [messages,setMessages]=useState([]);

const [text,setText]=useState("");



const loadMessages=async()=>{

const {data}=await chatAPI.getMessages(id);

setMessages(data.messages);

};



useEffect(()=>{

loadMessages();

},[]);



const send=async()=>{

if(!text.trim()) return;


await chatAPI.sendMessage(
id,
text
);


setText("");

loadMessages();


};



return (

<div className="min-h-screen bg-cream px-6 py-10">


<h1 className="font-serif text-4xl font-bold">

Chat 💬

</h1>



<div className="mt-8 bg-white rounded-xl p-6">


<div className="space-y-4">


{

messages.map(message=>(


<div key={message._id}>


<b>

{message.sender.name}

</b>


<p>

{message.text}

</p>


</div>


))

}


</div>




<div className="mt-6 flex gap-3">


<input

className="
border
rounded-lg
p-3
flex-1
"

value={text}

onChange={
e=>setText(e.target.value)
}

placeholder="Write message..."



/>



<button

onClick={send}

className="
bg-orange-500
text-white
px-5
rounded-lg
"

>

Send

</button>



</div>


</div>


</div>

);


}