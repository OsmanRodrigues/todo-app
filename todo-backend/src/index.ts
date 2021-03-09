import 'reflect-metadata';
import './module-aliases-helper';
import express from 'express';
import { AddressInfo } from 'net';
import { Env } from 'env-helper';
import { TaskRouter, UserRouter } from '@routes';

const app = express();

app.use(express.json());

app.use(UserRouter);
app.use(TaskRouter);

const server = app.listen(Env.BACKEND_PORT, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error('Failure upon starting server.');
  }
});

process.on('uncaughtException', err => {
  console.log(err);
});
