import {
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
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { RxDashboard } from 'react-icons/rx';

// import User from '../../Class/UserClass';
import { UserContext } from '../../context/UserContext';

const MyInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { first_name, last_name, id } = useContext(UserContext);
  const [item, setItem] = useState({
    item_name: '',
    description: '',
    quantity: '',
    user_id: id,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    document.title = 'My Inventory | Inventory';
  }, []);

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
          setInventory((prev) => [...prev, data]);
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

  const removeFromInventory = async (item) => {
    console.log('removing from inventory');
    const res = await fetch(`http://localhost:8080/inventory/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      console.log('Tried to delete the item but it no found');
    }
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveItem = (item) => {
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
        await removeFromInventory(item);
      }
    });
  };

  const updateItem = async (contents) => {
    console.log('removing from inventory');
    const res = await fetch(`http://localhost:8080/inventory/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contents),
    });
    if (!res.ok) {
      console.log('Tried to update item but i no see it');
    }
    setInventory((prev) =>
      prev.map((item) => (item.id === contents.id ? contents : item)),
    );
  };

  const handleEditingItem = (item) => {
    setEditingItem(item);
    setItem({
      item_name: item.item_name,
      description: item.description,
      quantity: item.quantity,
      user_id: id,
    });
    setIsUpdating(true);
    onOpen();
  };

  const handleUpdateItem = async (e) => {
    await updateItem({ ...editingItem, ...item });
    Swal.fire({
      title: 'Success',
      text: 'Item updated.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    onClose();
    setIsUpdating(false);
    setEditingItem(null);
  };

  const fetchMyInventory = async (item_name) => {
    try {
      const res = await fetch(`http://localhost:8080/myinventory/${item_name}`);
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
  // if (username) {
  //   fetchMyInventory(id);
  // }

  // if (loading) {
  //   return <div>...Loading</div>;
  // }

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
        <Text
          fontSize={40}
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          ${first_name} ${last_name}'s Inventory
        </Text>
      </Stack>
      <Button onClick={() => fetchMyInventory(id)}>
        Begin Rendering Your Items
      </Button>
      <Button
        onClick={onOpen}
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
      <Stack sx={{ display: 'inline-flex', alignItems: 'center' }} mr={50}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isUpdating ? 'Update Your Item' : 'Create A New Item'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={isUpdating ? handleUpdateItem : handleSubmit}>
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
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                  />
                </FormControl>

                <Button mt={4} colorScheme="teal" type="submit">
                  {isUpdating
                    ? 'Confirm Item Update'
                    : 'Press Here To Add New Item'}
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
          {loading ? (
            <div>...Loading</div>
          ) : (
            <Grid
              className="inventoryList"
              templateColumns="repeat(3, 1fr)"
              gap={6}
            >
              {inventory.map((item, index) => (
                <GridItem className="inventoryItem" key={index}>
                  <Card>
                    <CardBody>
                      <Button as={NavLink} to={`/item/${item.id}`}>Item Details</Button>
                      <Text>Item: {item.item_name}</Text>
                      <Text>
                        Description: {reducuceLength(item.description)}
                      </Text>
                      <Text>Quantity: {item.quantity}</Text>
                      <Button
                        onClick={() => handleEditingItem(item)}
                        variant="ghost"
                        leftIcon={<RxDashboard fontSize={20} />}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                        }}
                      >
                        Edit Your Item
                      </Button>

                      <Button onClick={() => handleRemoveItem(item)}>
                        Remove Item
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          )}
        </Stack>
      )}
    </Box>
  );
};

export { MyInventory };
export default MyInventory;
