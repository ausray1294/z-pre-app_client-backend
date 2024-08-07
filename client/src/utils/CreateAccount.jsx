import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

const CreateAccount = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const createUser = async (newUser) => {
    try {
      console.log(
        `new user ${newUser.username} has been submitted for creation`,
      );
      const response = await fetch('http://localhost:8080/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        console.log('Error posting new user');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(`Error creating new user`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        'createUser was triggered by handleSubmit:',
        createUser(userDetails),
      );
      await createUser(userDetails);
      Swal.fire({
        title: 'Success!',
        text: 'User created successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onClose();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while creating the account',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id="first_name" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="first_name"
                value={userDetails.first_name}
                onChange={handleChange}
                placeholder="First Name"
              />
            </FormControl>
            <FormControl id="last_name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="last_name"
                value={userDetails.last_name}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
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
                placeholder="Password"
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Create Account
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAccount;
