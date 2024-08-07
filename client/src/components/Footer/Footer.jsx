import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import ReadMe from '../Body/ReadMe';
import AboutPage from '../Body/AboutPage';

const Footer = () => {
  return (
    <Box
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Link to={ReadMe} /> Readme
      <Link to={AboutPage} /> AboutPage
    </Box>
  );
};

export { Footer };
export default Footer;
