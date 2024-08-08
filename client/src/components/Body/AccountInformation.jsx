import { Box, Card, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const AccountInformation = () => {
  const location = useLocation();
  const { first_name, last_name, username } = location.state;
  return (
    <Box>
      <Card>
        <Text>First Name: {first_name}</Text>
        <Text>Last Name: {last_name}</Text>
        <Text>Username: {username}</Text>
      </Card>
    </Box>
  );
};

export { AccountInformation };
export default AccountInformation;
