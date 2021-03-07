import dotenv from 'dotenv';

dotenv.config();

export const Env = {
  BACKEND_PORT: process.env.BACKEND_PORT,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  USER_TABLE_NAME: process.env.USER_TABLE_NAME,
  TASK_TABLE_NAME: process.env.TASK_TABLE_NAME,
  BCRYPT_COST: process.env.BCRYPT_COST,
  JWT_KEY: process.env.JWT_KEY,
  ACC_TOKEN_EXPIRES_IN: process.env.ACC_TOKEN_EXPIRES_IN
};
