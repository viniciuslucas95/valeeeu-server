import axios, { AxiosRequestConfig } from 'axios';
import { createReadStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { EnvironmentConfig } from '../../configs';
import { PathConstant } from '../../configs/constants';
import {
  createUserAsync,
  createWorkerProfileAsync,
  getAccessTokenAsync,
  getAxiosConfig,
} from '../helpers';

const pipelineAsync = promisify(pipeline);

const exampleImagePath = join(
  PathConstant.__rootfile,
  '/src',
  '/examples',
  '/image2.png'
);
const readableStream = createReadStream(exampleImagePath);
const url = `http://localhost:${EnvironmentConfig.serverPort}/images/workers`;
let axiosConfig: AxiosRequestConfig;

beforeAll(async () => {
  const { email, password } = await createUserAsync();
  const accessToken = await getAccessTokenAsync(email, password);
  axiosConfig = getAxiosConfig(accessToken);
  await createWorkerProfileAsync(axiosConfig);
});

describe('Worker image routes should', () => {
  describe('succeed on', () => {
    test('creating a new image', async () => {
      const { status } = await pipelineAsync(readableStream, () =>
        axios.post(url, readableStream, axiosConfig)
      );
      expect(status).toBe(201);
    });
  });
});
