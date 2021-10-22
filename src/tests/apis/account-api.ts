import axios from 'axios';
import { EnvironmentConfig } from '../../configs';
import { internet } from 'faker';
import {
  axiosConfig,
  getAxiosConfigWithAccessTokenHeader,
} from '../axios-config';
import { IAccountDto } from '../../api/entities/dtos';

const { email, password } = internet;
const url = `http://localhost:${EnvironmentConfig.serverPort}/accounts`;

export function generateRandomAccount(): IAccountDto {
  return {
    email: generateRandomEmail(),
    password: generateRandomPassword(),
  };
}

export function generateRandomEmail() {
  return email();
}

export function generateRandomPassword() {
  return password();
}

export async function createAccountAsync(data: Partial<IAccountDto>) {
  return await axios.post(url, data, axiosConfig);
}

export async function updateAccountAsync(
  id: string,
  data: Partial<IAccountDto>,
  accessToken: string
) {
  return await axios.patch(
    `${url}/${id}`,
    data,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function deleteAccountAsync(id: string, accessToken: string) {
  return await axios.delete(
    `${url}/${id}`,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function getAccountAsync(id: string, accessToken: string) {
  return await axios.get(
    `${url}/${id}`,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}
