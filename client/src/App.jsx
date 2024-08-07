import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AccountInformation } from './components/Body/AccountInformation';
import { UserContext } from './context/UserContext';
import { Box, Text } from '@chakra-ui/react';
import MyInventory from './components/Body/MyInventory';
import GeneralInventory from './components/Body/GeneralInventory';

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Box ml={400} sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Box>
        <Text>App</Text>
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
        <Route path="/inventory" element={<MyInventory />} />
        <Route path="/account-information" element={<AccountInformation />} />
      </Routes>
    </Box>
  );
}

export default App;
