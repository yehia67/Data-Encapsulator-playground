const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
  throw new Error(' Couldn\'t find .env file!');
}

module.exports = {
  port: parseInt(process.env.PORT, 10),
  api: {
    prefix: '/',
  },
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  serverUrl: process.env.SERVER_URL,
  adminAddress: process.env.adminAddress,
  adminSeed: process.env.adminPK
};