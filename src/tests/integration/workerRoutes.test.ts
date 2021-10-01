import { name, lorem } from 'faker';
import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfig } from '../../configs';
import {
  createUserAsync,
  getAccessTokenAsync,
  getAxiosConfig,
} from '../helpers';

const { findName, jobTitle, firstName } = name;
const { text } = lorem;
const url = `http://localhost:${EnvironmentConfig.serverPort}/workers`;
let accessToken: string;
let axiosConfig: AxiosRequestConfig;
let workerProfile: any;

beforeAll(async () => {
  const { id, email, password } = await createUserAsync();
  accessToken = await getAccessTokenAsync(email, password);
  axiosConfig = getAxiosConfig(accessToken);
  workerProfile = {
    name: findName(),
    job: jobTitle(),
    description: text(),
    userId: id,
    tags: [firstName(), firstName(), firstName()],
  };
});

describe('Worker routes should', () => {
  describe('succeed on', () => {
    test('creating a new worker profile', async () => {
      const { status } = await axios.post(url, workerProfile, axiosConfig);
      expect(status).toBe(201);
    });
  });
});
