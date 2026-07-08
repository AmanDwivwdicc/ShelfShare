import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useBooks } from "../context/BooksContext";
import { useAuth } from "../context/AuthContext";
import { requestsAPI } from "../api/services";
import { getBookImageUrl, formatPrice } from "../utils/bookImage";

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById } = useBooks();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id, getBookById]);

  const handleRequestDeal = async () => {
    setRequestLoading(true);
    setRequestError("");
    setRequestMessage("");

    try {
      const { data } = await requestsAPI.create(book.id);
      setRequestMessage(data.message);
    } catch (err) {
      setRequestError(err.message);
    } finally {
      setRequestLoading(false);
    }
  };

  const isOwnBook =
    book?.owner?.id === user?.id || book?.owner?.email === user?.email;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-ink-light">Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="text-center">
          <span className="text-6xl">📕</span>
          <h1 className="mt-4 font-serif text-2xl font-bold text-ink">
            Book Not Found
          </h1>
          <p className="mt-2 text-ink-light">
            {error || "This book may have been removed or the link is incorrect."}
          </p>
          <Link to="/dashboard" className="mt-6 inline-block">
            <Button variant="primary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isExchange = book.type === "exchange";
  const coverUrl = getBookImageUrl(book);

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-medium text-leather hover:underline"
        >
          ← Back
        </button>

        <div className="overflow-hidden rounded-2xl border border-parchment bg-white shadow-sm">
          <div className="grid md:grid-cols-5">
            <div className="relative overflow-hidden bg-parchment md:col-span-2">
              <img
                src={coverUrl}
                alt={`${book.title} cover`}
                className="aspect-[3/4] h-full w-full object-cover md:aspect-auto md:min-h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getBookImageUrl(null);
                }}
              />
            </div>

            <div className="p-8 md:col-span-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-parchment px-3 py-1 text-xs font-semibold uppercase tracking-wide text-leather">
                  {book.genre}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    isExchange
                      ? "bg-sage-light text-sage"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {isExchange ? "Exchange" : "For Sale"}
                </span>
              </div>

              <h1 className="mt-4 font-serif text-3xl font-bold text-ink">
                {book.title}
              </h1>
              <p className="mt-2 text-lg text-ink-light">by {book.author}</p>

              {!isExchange && book.price != null && (
                <p className="mt-4 text-3xl font-bold text-leather">
                  {formatPrice(book.price)}
                </p>
              )}

              <p className="mt-6 leading-relaxed text-ink-light">
                {book.description}
              </p>

              <div className="mt-8 rounded-xl border border-parchment bg-cream p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-light">
                  Listed by
                </h2>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-leather text-lg font-bold text-white">
                    {book.owner.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{book.owner.name}</p>
                  </div>
                </div>
              </div>

              {requestMessage && (
                <div className="mt-6 rounded-lg bg-sage-light px-4 py-3 text-sm text-sage">
                  {requestMessage}
                </div>
              )}

              {requestError && (
                <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {requestError}
                </div>
              )}

              {!isOwnBook && (
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8 w-full sm:w-auto"
                  onClick={handleRequestDeal}
                  disabled={requestLoading || !!requestMessage}
                >
                  {requestLoading ? "Sending..." : "Request Deal"}
                </Button>
              )}

              {isOwnBook && (
                <p className="mt-8 text-sm text-ink-light">
                  This is your listing.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
