import { useLibrary } from './LibraryContext';

export const Book = ({ book }) => {
  const { borrowBook, returnBook, removeBook } = useLibrary(); // Extracts borrowBook, returnBook and removeBook functions from the context, enabling book borrowing/returning functionality
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

      <button type="button" onClick={() => removeBook(book.id)}>
        Remove
      </button>
    </>
  );
};

//------LOGIC-----:

/* I know that button borrow is somehow turning on the borrowBook function in LibraryContextProvider. So how is that possible?. Well that is possible because of context and the component tree. Because how tree works I can see that the parent of Book is Category:
return (
    <>
      <h3>
        {title} ({categoryBooks.length}):
      </h3>
      {categoryBooks.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </>
  );
  
  and the parent of category is Books :
  
  return (
    <>
      <h2>Books ({state.length}):</h2>
      {categories.map((category, index) => (
        <Category key={index} title={category[0].toUpperCase() + category.slice(1)} category={category} />
      ))}
      <AddBookForm />
    </>
  );
  
  and the parent of Books is LibraryContextProvider in Library.jsx:
  return (
    <div className="App">
      <Heading size="xl">Library</Heading>
      <LibraryContextProvider>
        <Books />
      </LibraryContextProvider>
    </div>
  );
  and that is why Book has always a direct connection with context so the moment that borrowButton is clicked context get activated inside LibraryContext which updates state*/
