import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Box,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Swal from 'sweetalert2';
import { RxDashboard } from 'react-icons/rx';

const MyInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username, isLoggedIn } = useContext(UserContext);
  const [user_id, setUserId] = useState(null);
  const { isOpen, onClose } = useDisclosure();
  const [item, setItem] = useState({
    item_name: '',
    description: '',
    quantity: '',
    user_id: user_id,
  });

  useEffect(() => {
    document.title = 'My Inventory | Inventory';
  }, []);

  // const addToInventory = async (newItem) => {
  //   try {
  //     console.log(`attempting to add ${newItem} to the inventory`);
  //     const res = await fetch('http://localhost:8080/inventory/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newItem),
  //     });

  //     if (!res.ok) {
  //       console.log(`Error adding ${newItem}`);
  //     }
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(`Error adding new item ${newItem}`, error);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        'addToInventory was triggered by handleSubmit:',
        // addToInventory(item, id),
      );
      const dataToPost = { ...item };
      await fetch('http://localhost:8080/inventory/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Success:', data);
        });
      // await addToInventory(item);
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
        text: 'An error occurred while adding to your inventory',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const removeFromInventory = async (id) => {
    console.log('removing from inventory');
    const res = await fetch(`http://localhost:8080/inventory/:${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    if (!res.ok) {
      console.log('Tried to delete the item but it no found');
    }
  };

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be removed from your inventory.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeFromInventory(id);
      }
    });
  };

  const fetchMyInventory = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/myinventory/:${id}`);
      if (!res.ok) {
        throw new Error('Network response failed');
      }
      const data = await res.json();
      setInventory(data);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    fetchMyInventory();
  }

  //why are you such a pain!!!!!!!!! Here comes double fetch
const beginTheFetchOfMyInventory = () => {
    fetch(`http://localhost:8080/users/:${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.id);
        console.log(user_id);
      });
    fetchMyInventory(user_id);
  };

  if (loading) {
    return <div>...Loading</div>;
  }

  const reducuceLength = (description) => {
    console.log(description);
    if (description.length > 100) {
      return description.slice(0, 100) + '...';
    }
    return description;
  };

  return (
    <Box>
      <Stack>
        <Heading>${user_id}'s Inventory</Heading>
      </Stack>
      <Button
        isOpen={isOpen}
        onClose={onClose}
        variant="ghost"
        leftIcon={<RxDashboard fontSize={20} />}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        Add Item
      </Button>
      <Stack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormControl id="item_name" isRequired>
                  <FormLabel>Item Name</FormLabel>
                  <Input
                    type="text"
                    name="item_name"
                    value={item.item_name}
                    onChange={handleChange}
                    placeholder="Item Name"
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    placeholder="Description"
                  />
                </FormControl>
                <FormControl id="quantity" isRequired>
                  <FormLabel>quantity</FormLabel>
                  <Input
                    type="integer"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleChange}
                    placeholder="Username"
                  />
                </FormControl>

                <Button mt={4} colorScheme="teal" type="submit">
                  Add New Item
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
      </Stack>
      {inventory.length === 0 ? (
        <p>You have no items to display</p>
      ) : (
        <Stack mb={5}>
          <Text>General Inventory</Text>
          <Grid
            className="inventoryList"
            templateColumns="repeat(3, 1fr)"
            gap={6}
          >
            {inventory.map((item, index) => (
              <GridItem className="inventoryItem" key={index}>
                <Card>
                  <CardBody>
                    <Text>Item: {item.item_name}</Text>
                    <Text>Description: {reducuceLength(item.description)}</Text>
                    <Text>Quantity: {item.quantity}</Text>

                    <Button onClick={handleRemoveItem(item.id)}></Button>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      )}
    </Box>
  );
};

export { MyInventory };
export default MyInventory;
