import { Box, Card, Text } from '@chakra-ui/react';
import React from 'react'




const AccountInformation = ({user}) => {

  return (
    <Box>
      <Card>
        <Text>First Name: {user.first_name}</Text>
        <Text>Last Name: {user.last_name}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Id: {user.getUserId()}</Text>
      </Card>
    </Box>
  );
};

export { AccountInformation };
export default AccountInformation;
