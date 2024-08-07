import { useContext } from 'react';
import { Box, Card, Text } from '@chakra-ui/react';
import UserContext from '../../context/UserContext';

const AccountInformation = () => {
  const { first_name, last_name, username } = useContext(UserContext);

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
