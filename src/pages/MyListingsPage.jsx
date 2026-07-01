import { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useBooks } from "../context/BooksContext";


export default function MyListingsPage(){


const {
myBooks,
fetchMyBooks,
loading
} = useBooks();



useEffect(()=>{

fetchMyBooks();

},[]);




return (

<div className="min-h-screen bg-cream">

<div className="mx-auto max-w-7xl px-4 py-10">


<h1 className="
font-serif
text-4xl
font-bold
text-ink
">

My Listings 📚

</h1>


<p className="mt-2 text-ink-light">

Manage the books you have shared with the community.

</p>




{
loading && (

<p className="mt-10">
Loading your books...
</p>

)

}




{
!loading && myBooks.length===0 && (

<div className="
mt-10
rounded-xl
bg-white
p-10
text-center
">

<p className="text-5xl">
📭
</p>


<p className="mt-4 text-lg">
You haven't listed any books yet.
</p>


</div>

)

}




<div className="
mt-10
grid
gap-6
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
">


{

myBooks.map(book=>(


<BookCard

key={book.id}

book={book}

showDelete={true}

/>


))

}


</div>



</div>


</div>

);


}