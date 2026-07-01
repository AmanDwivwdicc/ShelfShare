import { useEffect, useState } from "react";
import { requestsAPI } from "../api/services";
import Button from "../components/Button";


export default function NotificationsPage(){

  const [requests,setRequests] = useState([]);
  const [loading,setLoading] = useState(true);


  const fetchRequests = async()=>{

    try{

        const {data} = await requestsAPI.getReceived();

        console.log("Received Requests:", data.requests);
        
        setRequests(data.requests);
    }
    catch(error){

      console.log(error.message);

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchRequests();

  },[]);



  const updateStatus = async(id,status)=>{

    await requestsAPI.updateStatus(id,status);

    fetchRequests();

  };




  if(loading){

    return <p className="p-10">Loading notifications...</p>

  }




return (

<div className="min-h-screen bg-cream px-6 py-10">


<h1 className="
font-serif
text-4xl
font-bold
text-ink
">

🔔 Notifications

</h1>



{
requests.length===0 ?

(

<p className="mt-10 text-ink-light">

No new requests.

</p>

)

:

(

<div className="mt-8 grid gap-6">


{

requests.map((request)=>(


<div

key={request._id}

className="
bg-white
rounded-xl
p-6
shadow
"


>


<h2 className="font-bold text-xl">

{request.requester.name}

</h2>


<p className="mt-2 text-gray-600">

wants your book:

<b>
{
request.book 
? request.book.title 
: "Book no longer available"
}
</b>

</p>



<div className="mt-5 flex gap-4">


<Button

variant="primary"

onClick={()=>updateStatus(request._id,"accepted")}

>

Accept

</Button>



<Button

variant="outline"

onClick={()=>updateStatus(request._id,"rejected")}

>

Reject

</Button>



</div>


</div>


))

}


</div>


)

}



</div>

)


}