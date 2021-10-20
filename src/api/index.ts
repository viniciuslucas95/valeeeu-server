import express from 'express';
import { EnvironmentConfig, PictureConfig } from '../configs';
import { PathConstant } from '../configs/constants';
import { RouteHandler } from './routes';

const server = express();
server.use(express.json({ limit: PictureConfig.maxSize }));
RouteHandler.setup(server);
server.use('/', express.static(PathConstant.publicFolder));
server.listen(EnvironmentConfig.serverPort, () => {
  console.log('Server started...');
});
