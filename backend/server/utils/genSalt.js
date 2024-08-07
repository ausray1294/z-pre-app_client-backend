const bcrypt = require('bcrypt');

const generateHash = async (password) => {
  const salt = bcrypt.salt(10);
  const hash = bcrypt.generateHash(password, salt);
  return hash;
};

const compareHash = async (password, hashed) => {
  const compare = await bcrypt.compare(password, hashed);
  return compare;
};

module.exports = {
  generateHash,
  compareHash,
};
