import { internet } from 'faker';
import axios, { AxiosRequestConfig } from 'axios';
import { IUserCreationDto } from '../../api/entities/dtos/user';
import { EnvironmentConfig } from '../../configs';
import { getAccessTokenAsync } from '../helpers';

const { email, password } = internet;
const url = `http://localhost:${EnvironmentConfig.serverPort}/users`;
const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};
let user: IUserCreationDto;
let userId: string;
let accessToken: string;

beforeAll(() => {
  user = {
    email: email(),
    password: password(),
  };
});

describe('User routes should', () => {
  describe('succeed on', () => {
    test('creating a new user', async () => {
      const { status, data } = await axios.post(url, user, axiosConfig);
      userId = data.id;
      expect(status).toBe(201);
      accessToken = await getAccessTokenAsync(user.email, user.password);
    });

    test('updating user', async () => {
      user.email = email();
      user.password = password();
      const { status } = await axios.patch(
        `${url}/${accessToken}`,
        user,
        axiosConfig
      );
      expect(status).toBe(204);
    });

    test('deleting user', async () => {
      const { status } = await axios.delete(
        `${url}/${accessToken}`,
        axiosConfig
      );
      expect(status).toBe(204);
    });
  });
});
