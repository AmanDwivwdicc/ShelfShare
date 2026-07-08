import { Link } from "react-router-dom";
import Button from "./Button";
import { getBookImageUrl, formatPrice } from "../utils/bookImage";

import { useBooks } from "../context/BooksContext";


export default function BookCard({ book, showDelete=false }) {


const { deleteBook } = useBooks();
  const isExchange = book.type === "exchange";
  const coverUrl = getBookImageUrl(book);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-parchment/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-parchment">
        <img
          src={coverUrl}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getBookImageUrl(null);
          }}
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm ${
            isExchange
              ? "bg-sage-light text-sage"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {isExchange ? "Exchange" : "For Sale"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-leather">
          {book.genre}
        </p>
        <h3 className="font-serif text-lg font-bold leading-snug text-ink line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-ink-light">by {book.author}</p>
        <p className="text-sm text-ink-light">Book Age: {book.bookAge}</p>
        <p className="text-sm text-ink-light">Condition: {book.condition}</p>

        {!isExchange && book.price != null && (
          <p className="mt-1 text-xl font-bold text-leather">
            {formatPrice(book.price)}
          </p>
        )}

        {book.owner?.name && (
          <p className="mt-2 text-xs text-ink-light">
            Listed by{" "}
            <span className="font-medium text-ink">{book.owner.name}</span>
          </p>
        )}

        <div className="mt-auto pt-4">
        {
showDelete ? (

<Button

variant="outline"

size="sm"

className="w-full"

onClick={()=>deleteBook(book.id)}

>

Remove Listing

</Button>


)

:

(

<Link to={`/book/${book.id}`}>

<Button 
variant="outline"
size="sm"
className="w-full"
>

View Details

</Button>

</Link>

)

}
        </div>
      </div>
    </article>
  );
}
