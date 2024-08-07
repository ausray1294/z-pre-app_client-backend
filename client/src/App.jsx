import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AccountInformation } from './components/Body/AccountInformation';
import { UserContext } from './context/UserContext';
import { Box, Text } from '@chakra-ui/react';
import MyInventory from './components/Body/MyInventory';
import GeneralInventory from './components/Body/GeneralInventory';
import Layout from './components/Layout/Layout';
import AboutPage from './components/Body/AboutPage';
import ReadMe from './components/Body/ReadMe';

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Box ml={400} sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Box>
        <Text>App</Text>
      </Box>
      <Box>
        {!isLoggedIn ? (
          <Box>
            <GeneralInventory />
          </Box>
        ) : (
          <Box>
            <MyInventory />
          </Box>
        )}
      </Box>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GeneralInventory />} />
          <Route path="/inventory" element={<MyInventory />} />
          <Route path="/account-information" element={<AccountInformation />} />
          <Route path="/read-me" element={<ReadMe />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
