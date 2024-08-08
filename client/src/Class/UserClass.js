class User {
  #password;
  constructor(
    id = mull,
    first_name = '',
    last_name = '',
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
    return this.#password;
  }

  updateUserDetails(data) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.#password = data.password;
    this.user_details = data;
  }

  getUserId() {
    return this.id;
  }
}

export default User;