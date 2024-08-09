import { Box } from '@chakra-ui/react';

const Footer = () => {
  return (
    <div>
      <Box
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        ml={400}
        sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      ></Box>
    </div>
  );
};

export { Footer };
export default Footer;
