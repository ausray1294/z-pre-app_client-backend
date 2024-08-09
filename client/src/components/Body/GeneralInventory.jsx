import {
  Box,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


const GeneralInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'General Inventory | Inventory';
  }, []);

  useEffect(() => {
    const fetchGeneralInventory = async () => {
      try {
        const res = await fetch('http://localhost:8080/inventory/');
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

    fetchGeneralInventory();
  }, []);

  if (loading) {
    return <div>...Loading</div>;
  }

  const reducuceLength = (description) => {
    if (description.length > 100) {
      return description.slice(0, 100) + '...';
    }
    return description;
  };

  return (
    <Box mr={50}>
      {/* <Stack>
        <Heading sx={{ display: 'inline-flex', alignItems: 'center' }}>
          Inventory
        </Heading>
      </Stack> */}
      <Stack mb={5} sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <Text fontSize={40}>General Inventory</Text>
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
                  <Button as={NavLink} to={`/item/${item.id}`}> More Details </Button>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export { GeneralInventory };
export default GeneralInventory;
