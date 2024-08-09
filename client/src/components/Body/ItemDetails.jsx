import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Heading } from '@chakra-ui/react';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8080/inventory/${id}`);
        if (!res.ok) {
          throw new Error('Network response failed');
        }
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error('error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvDetails();
  }, [id]);

  if (loading) {
    return <Text>Still waiting for your item to load</Text>;
  }
  return (
    <Box p={5}>
      <Heading>{item.item_name}</Heading>
      <Text>Description: {item.description} </Text>
      <Text>Quantity: {item.quantity}</Text>
    </Box>
  );
};

export { ItemDetails };
export default ItemDetails;
