import { createContext, useContext, useState } from "react";
import { collection } from "./collection";

export const LibraryContext = createContext({});

LibraryContext.displayName = "LibraryContext";

export const LibraryContextProvider = ({ children }) => {
  const [books, setBooks] = useState(collection.books);
  const borrowBook = (id) => {
    const newBooks = books.map((book) =>
      book.id === id ? { ...book, available: false } : book
    );
    return setBooks(newBooks);
  };
  const returnBook = (id) => {
    const newBooks = books.map((book) =>
      book.id === id ? { ...book, available: true } : book
    );
    return setBooks(newBooks);
  };

  return (
    <LibraryContext.Provider value={{ books, borrowBook, returnBook }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryContextProvider");
  }
  return context;
};
