import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import MyInventory from './components/Body/MyInventory';
import GeneralInventory from './components/Body/GeneralInventory';
import AccountInformation from './components/Body/AccountInformation';
import Layout from './components/Layout/Layout';
import AboutPage from './components/Body/AboutPage';
import ReadMe from './components/Body/ReadMe';

function App() {
  return (
    <Box ml={400} sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Box>
        <Heading>Painful App</Heading>
      </Box>

      <Box>
        <GeneralInventory />
      </Box>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GeneralInventory />} />
          <Route path="inventory" element={<MyInventory />} />
          <Route path="account-information" element={<AccountInformation />} />
          <Route path="read-me" element={<ReadMe />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
