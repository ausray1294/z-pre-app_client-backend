import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { RxDashboard, RxRocket } from 'react-icons/rx';
import CreateAccount from '../../utils/CreateAccount';
import Swal from 'sweetalert2';

const NavBar = () => {
  const { isLoggedIn, first_name, setUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });

  const loginUser = async (credientials) => {
    console.log(credientials);
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credientials),
      });

      if (!response.ok) {
        console.log(
          `Login request sent with ${credientials}, but nothing returned`,
        );
      }
      const data = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        ...data.user,
        isLoggedIn: true,
      }));
    } catch (error) {
      console.log('Error during Login:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('handleChange on NavBar');
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    console.log(userDetails);
    e.preventDefault();
    try {
      console.log(
        'Login was triggered by handleSubmit:',
        loginUser(userDetails),
      );
      await loginUser(userDetails);
      Swal.fire({
        title: 'Success!',
        text: 'Logged in successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while logging in',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Box>
      <Divider />
      {!isLoggedIn ? (
        <Box
          maxW="md"
          mx="auto"
          mt={10}
          p={6}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Text>Welcome! Please Create An Account</Text>
          <Heading as="h1" mb={6} textAlign="center">
            Login
          </Heading>
          <form onSubmit={handleLogin}>
            <VStack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={userDetails.username}
                  onChange={handleChange}
                  autoComplete="username"
                  placeholder="Username"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">
                Login
              </Button>
            </VStack>
          </form>

          <Button mt={4} colorScheme="blue" width="full" onClick={onOpen}>
            Create Account
          </Button>
          <CreateAccount
            isOpen={isOpen}
            onClose={onClose}
            variant="ghost"
            leftIcon={<RxDashboard fontSize={20} />}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          />

          {/* <Button mt={4} colorScheme="teal" width="full" onClick={onOpen}>
            Login
          </Button>
          <Login
            isOpen={isOpen}
            onClose={onClose}
            variant="ghost"
            leftIcon={<RxDashboard fontSize={20} />}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          /> */}
        </Box>
      ) : (
        <Box>
          <Text>Welcome {first_name}</Text>
          <Button
            as={NavLink}
            to="/account-information"
            variant="ghost"
            leftIcon={<RxDashboard fontSize={20} />}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            Account Information
          </Button>
        </Box>
      )}
      <Button
        as={NavLink}
        to="/inventory"
        variant="ghost"
        leftIcon={<RxRocket fontSize={20} />}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        Inventory
      </Button>
      {/* <Box sx={{ pl: '16rem' }}>
        <Container maxW="8xl">
          <Outlet />
        </Container>
      </Box> */}
    </Box>
  );
};

export { NavBar };
export default NavBar;
