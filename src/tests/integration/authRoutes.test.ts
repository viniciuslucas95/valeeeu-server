import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfig } from '../../configs';
import { createUserAsync } from '../helpers';

const url = `http://localhost:${EnvironmentConfig.serverPort}/auth`;
const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};
let accessToken: string;
let refreshToken: string;

describe('Auth routes should', () => {
  describe('succeed on', () => {
    test('getting both tokens', async () => {
      const { email, password } = await createUserAsync();
      const { data } = await axios.get(
        `${url}?email=${email}&password=${password}`,
        axiosConfig
      );
      expect(data.accessToken).toBeTruthy();
      expect(data.refreshToken).toBeTruthy();
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
    });

    test('generating a new access token', async () => {
      const { data } = await axios.get(`${url}/${refreshToken}`, axiosConfig);
      expect(data.accessToken).toBeTruthy();
      accessToken = data.accessToken;
    });
  });
});
