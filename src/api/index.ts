import express from 'express';
import { EnvironmentConfig } from '../configs';
import { Routes } from './routes';

const server = express();
server.use(express.json());
Routes.setup(server);
server.listen(EnvironmentConfig.serverPort, () => {
  console.log('Server started...');
});
