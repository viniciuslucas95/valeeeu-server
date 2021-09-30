import { internet } from 'faker';
import axios, { AxiosRequestConfig } from 'axios';
import { IUserCreationDto } from '../../api/entities/dtos/user';
import { EnvironmentConfig } from '../../configs';

const { email, password } = internet;
const url = `http://localhost:${EnvironmentConfig.serverPort}/users`;
const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};
let user: IUserCreationDto;
let userId: string;

beforeAll(() => {
  user = {
    email: email(),
    password: password(),
  };
});

describe('Users routes should', () => {
  describe('succeed on', () => {
    test('creating a new user', async () => {
      const { status, data } = await axios.post(url, user, axiosConfig);
      userId = data.id;
      expect(status).toBe(201);
    });

    test('updating user', async () => {
      (user.email = email()), (user.password = password());
      const { status } = await axios.patch(
        `${url}/${userId}`,
        user,
        axiosConfig
      );
      expect(status).toBe(204);
    });

    test('deleting user', async () => {
      await axios.delete(`${url}/${userId}`, axiosConfig);
    });
  });
});
