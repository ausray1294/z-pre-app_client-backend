class User {
  #password;
  constructor(
    id = null,
    first_name = '',
    last_name = '',
    username = '',
    password = '',
    loggedIn = false,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.#password = password;
    this.user_details = [];
    this.loggedIn = loggedIn;
  }

  set password(newPassword) {
    this.#password = newPassword;
  }

  get password() {
    return this.password;
  }

  updateUserDetails(data) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.#password = data.password;
    this.user_details = data;
    this.username = data.username;
    console.log(this.user_details);
  }

  getUserDetails() {
    return this.user_details;
  }

  getUserId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getFirstName() {
    return this.first_name;
  }
  getLastName() {
    return this.last_name;
  }
  // getUsername() {
  //   return this.username
  // }
}

export const fetchUserData = async (username) => {
  fetch(`http://localhost:8080/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Your class user id is set to ${data.id}`);
      const user = new User(data);
      return user;
    })
    .catch((err) => {
      console.log(`issues adding a user`, err);
    });
};

export default User;
