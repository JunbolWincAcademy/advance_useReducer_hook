import { useLibrary } from './LibraryContext';
import React, { useState } from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';

export const AddBookForm = () => {
  const { addBook } = useLibrary();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    addBook({
      title, // Directly use state variable, because onChange >>> setTitle is doing it
      author, // Directly use state variable
      category, // Directly use state variable
    });
    clearInputFields(); // Clear fields after submitting
  };

  const clearInputFields = () => {
    // Reset the states, which in turn clears the input fields
    setAuthor('');
    setTitle('');
    setCategory('');
  };
  return (
    <>
      <Flex mt="2rem">
        <form onSubmit={submitForm}>
          <Heading size="sm">Add a book here:</Heading>
          <label htmlFor="author">author:</label>
          <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <label htmlFor="title">title:</label>
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="category">category:</label>
          <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Button type="submit">+📖 Add Book</Button>
          <Button type="button" onClick={clearInputFields}>
            {' '}
            Reset
          </Button>
        </form>
      </Flex>
    </>
  );
};
