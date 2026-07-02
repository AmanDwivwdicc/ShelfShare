import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestsAPI } from "../api/services";

export default function Layout(){

    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {

        const loadCount = async () => {
      
          try {
      
            const { data } =
              await requestsAPI.getCount();
      
            setNotificationCount(data.count);
      
          } catch (err) {
            console.log(err);
          }
      
        };
      
        loadCount();
      
      }, []);
return(
<div className="min-h-screen bg-gray-50">

<Navbar notificationCount={notificationCount} />

<div className="max-w-7xl mx-auto px-6 py-8">
<Outlet/>
</div>

</div>
)

}