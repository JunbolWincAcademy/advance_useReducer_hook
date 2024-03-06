import { useLibrary } from "./LibraryContext";

export const Book = ({ book }) => {
  const { borrowBook, returnBook,removeBook } = useLibrary();// Extracts borrowBook and returnBook functions from the context, enabling book borrowing/returning functionality
  return (
    <>
      <h4>📖 {book.title}</h4>
      <p>✍ {book.author}</p>
      {book.available ? (
        <button type="button" onClick={() => borrowBook(book.id)}>
          ⇩ Borrow
        </button>
      ) : (
        <button type="button" onClick={() => returnBook(book.id)}>
          ⏎ Return
        </button>
      )}

      <button type="button" onClick={() => removeBook(book.id)}>Remove</button>
    </>
  );
};
