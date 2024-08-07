import { createContext, useState } from 'react';

const UserContext = createContext({
  id: '',
  first_name: '',
  last_name: '',
  username: '',
  password: '',
  isLoggedIn: false,
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    isLoggedIn: false,
  });

  // const loginUser = async (credientials) => {
  //   console.log(credientials);
  //   try {
  //     const response = await fetch('http://localhost:8080/users/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(credientials),
  //     });

  //     if (!response.ok) {
  //       console.log(
  //         `Login request sent with ${credientials}, but nothing returned`,
  //       );
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       ...data.user,
  //       isLoggedIn: true,
  //     }));
  //   } catch (error) {
  //     console.log('Error during Login:', error);
  //   }
  // };

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export { UserContext };
export default { UserContext, UserProvider };
