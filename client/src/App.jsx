import { Routes, Route } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Box, HStack, Card, Heading } from '@chakra-ui/react';
import MyInventory from './components/Body/MyInventory';
import GeneralInventory from './components/Body/GeneralInventory';
import AccountInformation from './components/Body/AccountInformation';
import Layout from './components/Layout/Layout';
import AboutPage from './components/Body/AboutPage';
import ReadMe from './components/Body/ReadMe';
import User from './Class/UserClass';
import { UserContext } from './context/UserContext';
import { ItemDetails} from './components/Body/ItemDetails';

function App() {
  const [user, setUser] = useState(new User());
  const { id } = useContext(UserContext);

  return (
    <Box
      ml={280}
      sx={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
        bg: 'gray.200',
        border: 'gray.700',
      }}
    >
      <Box>
        <Heading>Painful App</Heading>
      </Box>

      <Box>
        <HStack
          mb={40}
          sx={{
            bg: 'gray.200',
            border: 'gray.700',
          }}
        >
          {!id ? <GeneralInventory /> : <MyInventory />}
        </HStack>
      </Box>
      <Card>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<GeneralInventory />} />
            <Route path="inventory" element={<MyInventory user={user} />} />
            <Route
              path="account-information"
              element={<AccountInformation user={user} />}
            />
            <Route path="item/:id" element={<ItemDetails />} />
            <Route path="read-me" element={<ReadMe />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Card>
    </Box>
  );
}

export default App;
