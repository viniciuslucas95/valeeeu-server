import express from 'express';
import { EnvironmentConfig, PictureConfig } from '../configs';
import { RouteHandler } from './routes';

const server = express();
server.use(express.json({ limit: PictureConfig.maxSize }));
RouteHandler.setup(server);
server.listen(EnvironmentConfig.serverPort, () => {
  console.log('Server started...');
});
