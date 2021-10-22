import axios from 'axios';
import { EnvironmentConfig } from '../../configs';
import { axiosConfig } from '../axios-config';

const url = `http://localhost:${EnvironmentConfig.serverPort}/auth`;

export async function getTokensAsync(email: string, password: string) {
  return await axios.get(
    `${url}?email=${email}&password=${password}`,
    axiosConfig
  );
}

export async function getNewAccessTokenAsync(refreshToken: string) {
  return await axios.get(`${url}/refresh/${refreshToken}`, axiosConfig);
}

export async function verifyAccessTokenAsync(accessToken: string) {
  return await axios.get(`${url}/verify/${accessToken}`, axiosConfig);
}
