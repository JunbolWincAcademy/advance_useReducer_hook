import { createContext, useContext, useReducer } from 'react';
import { collection } from './collection';

// Creating and naming the Library context
export const LibraryContext = createContext({});
LibraryContext.displayName = 'LibraryContext';

// Defining the reducer function for managing books state
const booksListReducer = (state, action) => {
  switch (action.type) {
    case 'borrow-book':
      // Update the book's availability based on action.id
      return state.map((book) => (book.id === action.id ? { ...book, available: false } : book));
    case 'return-book': //✅ Return book case
      // Update the book's availability based on action.id
      return state.map((book) => (book.id === action.id ? { ...book, available: true } : book));

    case 'add-book': //✅ Add book case
      // Add a new book to the collection
      const newBookId = state.length ? state[state.length - 1].id + 1 : 1; //This line determines the ID for a new book. If the state (books array) is not empty, it calculates the new ID by adding 1 to the last book's ID
      return [...state, { id: newBookId, ...action.book, available: true }]; // / This line adds a new book to the current state (books array) by spreading the existing books and appending a new book object. The new book object is constructed by assigning it the new ID calculated previously, spreading the book details from the action payload, and setting its availability to true.
     

    case 'remove-book': //✅ Remove book case
      // Remove a book from the collection
      return state.filter((book) => book.id !== action.id); //Removes the book with the specified ID by filtering out books that don't match the given ID, ensuring the state is updated without the removed book
    default:
      return state;
  }
};

// Initial state containing the collection of books
const initialState = collection.books;

export const LibraryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksListReducer, initialState);

  const borrowBook = (id) => dispatch({ type: 'borrow-book', id }); // Borrow a book
  const returnBook = (id) => dispatch({ type: 'return-book', id }); //✅ Return a book
  const addBook = (book) => dispatch({ type: 'add-book', book }); //✅ Add a new book
  const removeBook = (id) => dispatch({ type: 'remove-book', id }); //✅ Remove a book

  return <LibraryContext.Provider value={{ state, borrowBook, returnBook, addBook, removeBook }}>{children}</LibraryContext.Provider>;
};

//------here is the custom made use library hook:
export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryContextProvider');
  }
  return context;
};
