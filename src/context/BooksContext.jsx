import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import { booksAPI } from "../api/services";


const BooksContext = createContext(null);



export function BooksProvider({ children }) {


  const [books,setBooks] = useState([]);

  const [myBooks,setMyBooks] = useState([]);

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState(null);



  const fetchBooks = useCallback(async()=>{

    setLoading(true);

    try{

      const {data}= await booksAPI.getAll();

      setBooks(data.books);

    }
    catch(err){

      setError(err.message);

    }
    finally{

      setLoading(false);

    }

  },[]);




  const fetchMyBooks = useCallback(async()=>{


    try{

      const {data}= await booksAPI.getMyBooks();

      setMyBooks(data.books);

      return data.books;

    }
    catch(err){

      setError(err.message);

    }

  },[]);





  const addBook = async(bookData)=>{

    const {data}= await booksAPI.create(bookData);

    setBooks(prev=>[data.book,...prev]);

    return data.book;

  };





  const deleteBook = async(id)=>{

    await booksAPI.delete(id);


    setBooks(prev =>
      prev.filter(book=>book.id !== id)
    );


    setMyBooks(prev =>
      prev.filter(book=>book.id !== id)
    );

  };






  const getBookById = async(id)=>{


    const cached = books.find(book=>book.id===id);


    if(cached) return cached;



    const {data}=await booksAPI.getById(id);


    return data.book;

  };




  return(

    <BooksContext.Provider

      value={{

        books,

        myBooks,

        loading,

        error,

        fetchBooks,

        fetchMyBooks,

        addBook,

        deleteBook,

        getBookById

      }}

    >

      {children}

    </BooksContext.Provider>

  );


}





export function useBooks(){

const context = useContext(BooksContext);


if(!context){

throw new Error(
"useBooks must be used within BooksProvider"
);

}


return context;

}
