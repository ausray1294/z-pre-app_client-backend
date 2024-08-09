import { NavLink } from 'react-router-dom';
import React, { useState, useContext } from 'react';
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
import {
  RxDashboard,
  RxRocket,
  RxActivityLog,
  RxAvatar,
  RxBackpack,
} from 'react-icons/rx';
import CreateAccount from '../../utils/CreateAccount';
import Swal from 'sweetalert2';
import User from '../../Class/UserClass';
import { UserContext } from '../../context/UserContext';

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myProfile, setMyProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });
  const user = new User();

  const loginUser = async (credientials) => {
    console.log(credientials);
    try {
      const response = await fetch(`http://localhost:8080/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credientials),
      });

      if (!response.ok) {
        if (response.status === 409) {
          console.log('Conflict: on server side');
        } else {
          console.log(
            `Login request sent with ${JSON.stringify(
              credientials,
            )}, but nothing returned`,
          );
        }
        return;
      }

      const data = await response.json();
      setLoggedIn(true);
      setMyProfile(data.user);

      const { username } = credientials;
      await fetchUserData(username);
    } catch (error) {
      console.log('Error during Login:', error);
    }
  };

  const fetchUserData = async (username) => {
    fetch(`http://localhost:8080/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        user.updateUserDetails(data);
        console.log(`Your user id is set to ${data.id}`);
      })
      .catch((err) => {
        console.log(`issues adding a user`, err);
      });
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
      {!loggedIn ? (
        <Box
          maxW="md"
          mx="auto"
          mt={10}
          p={6}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Text>Welcome! Please Create An Account or Login!!</Text>
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
          <Text>Welcome {myProfile.first_name}</Text>
          <Button
            as={NavLink}
            to="/account-information"
            state={myProfile}
            variant="ghost"
            leftIcon={<RxAvatar fontSize={20} />}
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
        state={myProfile}
        variant="ghost"
        leftIcon={<RxBackpack fontSize={20} />}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        My Inventory
      </Button>
      <Button
        as={NavLink}
        to="/"
        state={myProfile}
        variant="ghost"
        leftIcon={<RxRocket fontSize={20} />}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        General Inventory
      </Button>
      <Button
        as={NavLink}
        to="/read-me"
        state={myProfile}
        variant="ghost"
        leftIcon={<RxActivityLog fontSize={20} />}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        Read Me
      </Button>
      <Button
        as={NavLink}
        to="/about"
        state={myProfile}
        variant="ghost"
        leftIcon={<RxDashboard fontSize={20} />}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        About
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
