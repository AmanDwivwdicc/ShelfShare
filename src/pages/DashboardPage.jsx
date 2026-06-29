import { useEffect } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useBooks } from "../context/BooksContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const { books, loading, error, fetchBooks } = useBooks();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="mt-2 text-ink-light">
              Browse affordable books to buy, sell, or exchange
            </p>
          </div>
          <Link to="/add-book">
            <Button variant="primary">+ Add a Book</Button>
          </Link>
        </div>

        <div className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-ink">
              All Books
            </h2>
            {!loading && (
              <span className="text-sm text-ink-light">
                {books.length} {books.length === 1 ? "listing" : "listings"}
              </span>
            )}
          </div>

          {loading && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="animate-pulse overflow-hidden rounded-2xl border border-parchment bg-white"
                >
                  <div className="aspect-[3/4] bg-parchment" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-1/3 rounded bg-parchment" />
                    <div className="h-5 w-3/4 rounded bg-parchment" />
                    <div className="h-4 w-1/2 rounded bg-parchment" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-red-600">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={fetchBooks}
              >
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && books.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-parchment bg-white p-12 text-center">
              <span className="text-5xl">📭</span>
              <p className="mt-4 text-lg text-ink-light">No books listed yet.</p>
              <Link to="/add-book" className="mt-4 inline-block">
                <Button variant="primary">Add the First Book</Button>
              </Link>
            </div>
          )}

          {!loading && !error && books.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
