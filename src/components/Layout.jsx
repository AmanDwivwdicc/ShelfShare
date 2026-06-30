import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout(){

return(
<div className="min-h-screen bg-gray-50">

<Navbar/>

<div className="max-w-7xl mx-auto px-6 py-8">
<Outlet/>
</div>

</div>
)

}