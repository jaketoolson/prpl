import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file️");
}

export default {
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,

  log: {
    level: "silly"
  }
};
