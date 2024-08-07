
import {
  Heading,
  Box,
  Image,
  Stack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const GeneralInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'News | Struggle Bus';
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

  return (
    <Box>
      <Stack>
        <Heading>Potatoes</Heading>
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
                  <Text>{item.item_name}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.quantity}</Text>
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
