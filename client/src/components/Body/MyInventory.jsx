import {
  Heading,
  Box,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';

const MyInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user_id } = useContext(UserContext);

  useEffect(() => {
    document.title = 'My Inventory | Inventory';
  }, []);

  useEffect(() => {
    const fetchMyInventory = async () => {
      try {
        const res = await fetch(`http://localhost:8080/inventory/:${user_id}`);
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

    fetchMyInventory();
  }, []);

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
        <Heading>Inventory</Heading>
      </Stack>
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
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export { MyInventory };
export default MyInventory;
