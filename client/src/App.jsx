import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AccountInformation } from './components/Body/AccountInformation';
import { UserContext } from './context/UserContext';
import { Box, Text } from '@chakra-ui/react';
import ReadMe from './components/Body/ReadMe';
import AboutPage from './components/Body/AboutPage';
import MyInventory from './components/Body/MyInventory';
import GeneralInventory from './components/Body/GeneralInventory';

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Box>
      <Box>
        <Text>
          App
        </Text>
      </Box>
      {!isLoggedIn ? (
        <Box>
          <GeneralInventory />
        </Box>
      ) : (
        <Box>
          <MyInventory />
        </Box>
      )}
      <Routes>
        <Route path="/" element={<GeneralInventory />} />
        <Route path="/read-me" element={<ReadMe />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/inventory" element={<MyInventory />} />
        <Route path="/account-information" element={<AccountInformation />} />
      </Routes>
    </Box>
  );
}

export default App;
