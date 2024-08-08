import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

const Layout = ({user, setUser}) => {
  return (
    <Box>
      <Header user={user} setUser={setUser} sx={{ paddingTop: '2rem', paddingBottom: '2rem' }} />
      <Box sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Outlet />
      </Box>
      <Footer sx={{ paddingTop: '2rem', paddingBottom: '2rem' }} />
    </Box>
  );
};

export default Layout;
