import { Category } from './Category';
import { useLibrary } from './LibraryContext';
import { AddBookForm } from './AddBookForm';

export const Books = () => {
  const { state } = useLibrary();
  const categories = state.reduce((categories, book) => (categories.includes(book.category) ? categories : categories.concat(book.category)), []);
  return (
    <>
      <h2>Books ({state.length}):</h2>
      {categories.map((category, index) => (
        <Category key={index} title={category[0].toUpperCase() + category.slice(1)} category={category} />
      ))}
      <AddBookForm />
    </>
  );
};

//-----EXPLANATION OF REDUCE()

/* The reduce method in the code you've provided serves to iterate over all books in the state and build a list of unique categories. This method is particularly useful when you have a collection of items with potentially repeated properties (in this case, book categories) and you want to create a list where each category appears only once. The reason to use reduce here, despite knowing there are two categories, is to ensure the code remains scalable and functional regardless of how many books or categories are added in the future. It automates the process of identifying unique categories, making the code more efficient and reducing the need for manual updates as the dataset changes. */

//-----EXPLANATION OF title={category[0].toUpperCase() + category.slice(1)}
/* category[0].toUpperCase() is to take the first letter and  capitalize and the use slice(1) to cut the word in two starting from the letter in position 1 'r' so you get 'rogramming', the '+' is use to concatonete "P" and 'rogramming' */