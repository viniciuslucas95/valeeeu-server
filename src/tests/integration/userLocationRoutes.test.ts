import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfig } from '../../configs';
import {
  createUserAsync,
  getAccessTokenAsync,
  getAxiosConfig,
} from '../helpers';
import { datatype } from 'faker';

const { number } = datatype;
const url = `http://localhost:${EnvironmentConfig.serverPort}/users/locations`;
let axiosConfig: AxiosRequestConfig;

beforeAll(async () => {
  const { email, password } = await createUserAsync();
  const accessToken = await getAccessTokenAsync(email, password);
  axiosConfig = getAxiosConfig(accessToken);
});

describe('User location routes should', () => {
  describe('succeed on', () => {
    test('creating a new user location', async () => {
      const data = {
        latitude: number(),
        longitude: number(),
      };
      const { status } = await axios.patch(url, data, axiosConfig);
      expect(status).toBe(204);
    });

    test('updating user location', async () => {
      const data = {
        latitude: number(),
        longitude: number(),
      };
      const { status } = await axios.patch(url, data, axiosConfig);
      expect(status).toBe(204);
    });
  });
});
