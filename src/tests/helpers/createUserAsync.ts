import { internet } from 'faker';
const { email, password } = internet;
import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfig } from '../../configs';
const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};

export async function createUserAsync() {
  const user = {
    email: email(),
    password: password(),
  };
  const url = `http://localhost:${EnvironmentConfig.serverPort}/users`;
  const { data } = await axios.post(url, user, axiosConfig);
  return { id: data.id, email: user.email, password: user.password };
}
