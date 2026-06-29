export const DEFAULT_BOOK_COVER =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop&q=80";

export function getBookImageUrl(book) {
  return book?.image || DEFAULT_BOOK_COVER;
}

export function formatPrice(price) {
  if (price == null) return null;
  return `₹${Number(price).toLocaleString("en-IN")}`;
}
