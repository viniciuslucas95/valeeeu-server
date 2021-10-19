import axios from 'axios';
import { EnvironmentConfig } from '../../configs';
import { internet } from 'faker';
import { axiosConfig } from '../axios-config';
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
  data: Partial<IAccountDto>
) {
  return await axios.patch(`${url}/${id}`, data, axiosConfig);
}

export async function deleteAccountAsync(id: string) {
  return await axios.delete(`${url}/${id}`, axiosConfig);
}

export async function getAccountAsync(id: string) {
  return await axios.get(`${url}/${id}`, axiosConfig);
}
