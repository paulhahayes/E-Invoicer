import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3200;

export const config = {
  port: PORT,
  url: 'http://localhost',
};

export default config;
