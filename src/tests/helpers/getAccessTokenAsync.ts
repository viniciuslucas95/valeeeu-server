import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfig } from '../../configs';

const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};

export async function getAccessTokenAsync(email: string, password: string) {
  const url = `http://localhost:${EnvironmentConfig.serverPort}/auth?email=${email}&password=${password}`;
  const { data } = await axios.get(url, axiosConfig);
  return data.accessToken;
}
