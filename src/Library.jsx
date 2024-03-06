import { Books } from "./Books";
import { LibraryContextProvider } from "./LibraryContext";
import { Flex, Heading, Text, Button } from '@chakra-ui/react';


function Library() {
  return (
    <div className="App">
      <Heading size="xl">Library</Heading>
      <LibraryContextProvider>
        <Books />
      </LibraryContextProvider>
    </div>
  );
}

export default Library;
