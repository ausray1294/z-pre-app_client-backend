import { Box, Card, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
// import User from '../../Class/UserClass';
import {UserContext} from '../../context/UserContext';

const AccountInformation = () => {
  // const [accountDetails, setAccountDetails] = useState({
  //   id: null,
  //   first_name: '',
  //   last_name: '',
  //   username: '',
  // });
  const { first_name , last_name, username, id} = useContext(UserContext);

  // useEffect(() => {
  //   const accDets = () => {
  //     const user = User.getUserDetails();
  //     setAccountDetails({
  //       id: user.id,
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       username: user.username,
  //     });
  //     console.log(accountDetails`on the Account Information page`);
  //   };
  //   accDets();
  // }, [accountDetails]);

  return (
    <Box>
      <Card>
        <Text>First Name: {first_name}</Text>
        <Text>Last Name: {last_name}</Text>
        <Text>Username: {username}</Text>
        <Text>Id: {id}</Text>
      </Card>
    </Box>
  );
};

export { AccountInformation };
export default AccountInformation;
