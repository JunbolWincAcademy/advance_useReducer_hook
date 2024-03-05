import React from "react";
import ReactDOM from "react-dom/client";
import Library from "./Library";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Library />
    </ChakraProvider>    
  </React.StrictMode>
);
