import { Book } from './Book';
import { useLibrary } from './LibraryContext';

export const Category = ({ title, category }) => {
  //it was like this: ({ title, category })
  const { state } = useLibrary();
  const categoryBooks = state.filter((book) => book.category === category);
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
};
