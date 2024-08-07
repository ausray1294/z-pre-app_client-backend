import { Link, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import ReadMe from '../Body/ReadMe';
import AboutPage from '../Body/AboutPage';

const Footer = () => {
  return (
    <div>
      <Routes>
        <Route path="/read-me" element={<ReadMe />} />
        <Route path="/read-me" element={<ReadMe />} />
      </Routes>

      <Box
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        ml={400}
        sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        <Link to={ReadMe}> Readme </Link>
        <Link to={AboutPage}> AboutPage </Link>
      </Box>
    </div>
  );
};

export { Footer };
export default Footer;
