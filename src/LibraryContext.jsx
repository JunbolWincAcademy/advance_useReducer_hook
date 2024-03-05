import { createContext, useContext, useReducer } from 'react';
import { collection } from './collection';

// Creating and naming the Library context
export const LibraryContext = createContext({});
LibraryContext.displayName = 'LibraryContext';

// Defining the reducer function for managing books state
const booksListReducer = (state, action) => {//this comes from const reducer = (state, action) => nextState (next action);
  switch (action.type) {
    case 'borrow-book':
      // How can you update the book's availability based on action.id?
      return state.map((book) => (book.id === action.id ? { ...book, available: false } : book));
   
    // Remember to include cases for 'return-book', 'add-book', and 'remove-book'
    default:
      return state;
  }
};

// Think about what your initialState should contain. Should it be the collection of books?
const initialState = collection.books; // Is this the correct way to initialize your state with your books data?

export const LibraryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksListReducer, initialState);

  // How can you implement the borrowBook function using dispatch?
  // Hint: You might need to dispatch an action with the type 'borrow-book' and the id of the book.

  // borrowBook Function for borrow_book case in booksListReducer above 
  const borrowBook = (itemId) => {
    dispatch({
      type: 'borrow-book',
      itemId,
    });
  };

  // How about the returnBook function? It would be similar to borrowBook but would make the book available again.

  // What about adding and removing books? Think about the actions you need to dispatch.

  // Setting up your context provider to pass down the books state and dispatch function

  return <LibraryContext.Provider value={{ state, dispatch }}>{children}</LibraryContext.Provider>;
};

// Utility hook to use the Library context in other components
export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryContextProvider');
  }
  return context;
};
