import NavBar from './NavBar';
import { Box, Stack, Text, Image, Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeButton = () => {
  const location = useLocation();
  return (
    location.pathname !== '/' && (
      <Link to="/">
        <Image
          borderRadius="full"
          boxSize="100px"
          src="../../assets/icon.jpg"
          alt="Inventory"
        />
      </Link>
    )
  );
};

const Header = () => {
  return (
    <Box>
      <Stack
        sx={{
          width: '16rem',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          borderWidth: 1,
          borderColor: 'gray.200',
          padding: '1.75rem 1.5rem',
        }}
      >
        <Stack spacing={4} mb={8} alignItems="center">
          {/* <HomeButton /> */}
          <Heading
            onClick={() => HomeButton}
            fontStyle="italic"
            border="2px solid black"
            background="black"
            color="white"
            p={2}
            borderRadius="lg"
          >
            Inventory
          </Heading>
          <Text fontStyle="italic">Browser</Text>
        </Stack>
        <NavBar />
      </Stack>
    </Box>
  );
};

export { Header };
export default Header;
