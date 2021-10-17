import express from 'express';
import { EnvironmentConfig } from '../configs';
import { RouteHandler } from './routes';

const server = express();
server.use(express.json());
RouteHandler.setup(server);
server.listen(EnvironmentConfig.serverPort, () => {
  console.log('Server started...');
});
