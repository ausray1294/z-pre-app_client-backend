import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/UserContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import theme from './theme/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <Header
            sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            //pushed to the side
          />
          <App
            //centered
          />
          <Footer
            sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            //bottom center
          />
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
