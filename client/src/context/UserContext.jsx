import { createContext, useState, useEffect } from 'react';

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
  const [data, setData] = useState(null);
  const [user, setUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    isLoggedIn: false,
  });

  if (isLoggedIn)
    useEffect(() => {
      async function fetchUserData() {
        const res = await fetch(`http://localhost:8080/users/`);
        const data = await res.json();
        setData(data);
      }
      fetchUserData();
    }, []);

  return (
    <UserContext.Provider value={{ ...user, setUser, ...data }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export { UserContext };
export default { UserContext, UserProvider };
