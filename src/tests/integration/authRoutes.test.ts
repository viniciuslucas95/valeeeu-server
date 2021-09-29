import { internet } from 'faker';
import axios, { AxiosRequestConfig } from 'axios';
import { IUserCreationDto } from '../../api/entities/dtos/user';
import { EnvironmentConfig } from '../../configs';

const { email, password } = internet;
const url = `http://localhost:${EnvironmentConfig.serverPort}/auth`;
const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};
let user: IUserCreationDto;
let accessToken: string;
let refreshToken: string;

beforeAll(async () => {
  user = {
    email: email(),
    password: password(),
  };
  const url = `http://localhost:${EnvironmentConfig.serverPort}/users`;
  await axios.post(url, user, axiosConfig);
});

describe('Auth routes should', () => {
  describe('succeed on', () => {
    test('getting both tokens', async () => {
      const { data } = await axios.get(
        `${url}?email=${user.email}&password=${user.password}`,
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
