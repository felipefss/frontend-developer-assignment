import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './components/App';
import { RecipientListProvider } from './context/RecipientListContext';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RecipientListProvider>
        <App />
      </RecipientListProvider>
    </ChakraProvider>
  </React.StrictMode>
);
