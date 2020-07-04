const bcrypt = require('bcrypt');
const saltRounds = 10;

const Encrypter = {
  hash: async (plainTextPassword: string) => {
    return await bcrypt.hash(plainTextPassword, saltRounds);
  },
  compare: async (plainTextPassword: string, hash: string) => {
    return await bcrypt.compare(plainTextPassword, hash);
  }
}

export default Encrypter;
