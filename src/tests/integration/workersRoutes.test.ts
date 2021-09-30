import faker, { name, internet, lorem } from 'faker';
import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfig } from '../../configs';
import { IUserCreationDto } from '../../api/entities/dtos/user';
import { IWorkerProfileCreationDto } from '../../api/entities/dtos/workerProfile';

interface IHaveTags {
  tags: any;
}

const { findName, jobTitle, firstName } = name;
const { email, password } = internet;
const { text } = lorem;
const url = `http://localhost:${EnvironmentConfig.serverPort}/workers`;
const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};
let user: IUserCreationDto;
let userId: string;
let workerProfile: IWorkerProfileCreationDto & IHaveTags;
let accessToken: string;

beforeAll(async () => {
  const usersUrl = `http://localhost:${EnvironmentConfig.serverPort}/users`;
  user = {
    email: email(),
    password: password(),
  };
  const { data: userData } = await axios.post(usersUrl, user, axiosConfig);
  const authUrl = `http://localhost:${EnvironmentConfig.serverPort}/auth`;
  const { data: authData } = await axios.get(
    `${authUrl}?email=${user.email}&password=${user.password}`,
    axiosConfig
  );
  accessToken = authData.accessToken;
  userId = userData.id;
  workerProfile = {
    name: findName(),
    job: jobTitle(),
    description: text(),
    userId,
    tags: [firstName(), firstName(), firstName()],
  };
});

describe('Workers routes should', () => {
  describe('succeed on', () => {
    test('creating a new worker profile', async () => {
      const { status } = await axios.post(url, workerProfile, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
        ...axiosConfig,
      });
      expect(status).toBe(201);
    });
  });
});
