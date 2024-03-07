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

//-----------LOGIC--------------
/* When you call useReducer(booksListReducer, initialState); in your component, you're setting up state management for your application with the reducer pattern. Here's a breakdown of the concepts and the flow when the "Borrow" button is clicked:

useReducer Hook: It's a React hook that allows you to manage complex state logic in your components. It takes a reducer function (booksListReducer) and an initial state (initialState) as arguments. The useReducer hook returns the current state (state) and a dispatch function (dispatch).

Initial State (initialState): This is the initial setup of your state. In your context, initialState likely represents the initial collection of books (collection.books). It's the starting point for your state before any actions have been dispatched to modify it.

Reducer Function (booksListReducer): This function defines how your state should change in response to different actions. It takes the current state and an action as parameters, then returns a new state based on the action type. The reducer function has a switch statement or a series of if statements that check the action type and update the state accordingly.

Dispatching Actions: When a user interacts with your application, such as clicking the "Borrow" button, you dispatch an action. An action is an object that describes what happened and may include additional data. For example, an action to borrow a book might look like { type: 'borrow-book', id: bookId }.
//-----------------------
GPT
The "cable" or connection you're looking for between the Book component and the LibraryContext is the useLibrary hook. Let's break down how this works:

Context Creation and Provision:
In LibraryContext.jsx, you create a context and a context provider (LibraryContextProvider). This provider is where you use useReducer to manage your library's state and provide the dispatch function.
Defining Action Dispatchers:
Inside LibraryContextProvider, you define functions like borrowBook, returnBook, and removeBook. These functions internally call dispatch with specific action types (e.g., { type: 'borrow-book', id }). It's these functions that encapsulate the "actions" you're dispatching back to the reducer.
Making Dispatchers Available via Context:
You then pass these action dispatcher functions (borrowBook, returnBook, removeBook) through the context's value. This makes them available to any component that consumes this context.
Consuming the Context in Book Component:
In Book.jsx, you use the useLibrary custom hook to consume the context. This hook internally uses useContext(LibraryContext) to access the context's value.
By doing this, Book.jsx gains access to the borrowBook, returnBook, and removeBook functions that were provided by the context.
Triggering Actions from UI Events:
Inside Book.jsx, when the "Borrow" or "Return" buttons are clicked, they trigger the corresponding functions (borrowBook(book.id) or returnBook(book.id)), which in turn call dispatch with the appropriate actions. This updates the state within LibraryContext according to the logic defined in your reducer.
State Update and Re-render:
The state update triggers a re-render of components consuming the context, reflecting the new state in your UI.
In summary, the connection is made through the context system. The useLibrary hook is the key part that accesses the context's value (which includes your dispatcher functions) and makes it available to your Book component. When actions are dispatched from Book, they are processed by the reducer in LibraryContext, leading to state updates and UI changes.
//----------------------
Handling the "Borrow" Button Click:

When the "Borrow" button is clicked, it triggers a function that dispatches an action with the type borrow-book and the ID of the book to be borrowed.
The dispatch function sends this action to your booksListReducer.
Inside booksListReducer, there's a case for handling borrow-book actions. It takes the current state (the array of books), finds the book with the matching ID, updates its available status to false, and returns the updated array of books as the new state.
React automatically updates the component with the new state, reflecting the borrowed book's updated availability.
In summary, booksListReducer in useReducer(booksListReducer, initialState); serves as the logic center that dictates how your application's state changes in response to actions. When a user clicks the "Borrow" button, it triggers a sequence of actions that flow through the reducer to update the state accordingly. */