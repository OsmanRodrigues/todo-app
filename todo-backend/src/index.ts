import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Test!!!' });
});

const server = app.listen(process.env.APP_PORT, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error('Failure upon starting server.');
  }
});
