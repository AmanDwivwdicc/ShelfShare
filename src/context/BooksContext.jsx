import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { booksAPI } from "../api/services";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await booksAPI.getAll();
      setBooks(data.books);
      return data.books;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = async (bookData) => {
    const { data } = await booksAPI.create(bookData);
    setBooks((prev) => [data.book, ...prev]);
    return data.book;
  };

  const getBookById = async (id) => {
    const cached = books.find((book) => book.id === id);
    if (cached) return cached;

    const { data } = await booksAPI.getById(id);
    return data.book;
  };

  return (
    <BooksContext.Provider
      value={{ books, loading, error, fetchBooks, addBook, getBookById }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}
