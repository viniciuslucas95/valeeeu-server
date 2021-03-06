import axios from 'axios';
import { name } from 'faker';
import { IProfileDto } from '../../../api/entities/dtos/profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import {
  axiosConfig,
  getAxiosConfigWithAccessTokenHeader,
} from '../../axios-config';

const { findName } = name;

export function generateRandomProfile(): IProfileDto {
  return { name: generateRandomName() };
}

export function generateRandomName() {
  return findName();
}

export async function createProfileAsync(
  accountId: string,
  data: Partial<IProfileDto>,
  accessToken: string
) {
  return await axios.post(
    getFullUrl(accountId),
    data,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function updateProfileAsync(
  accountId: string,
  profileId: string,
  data: Partial<IProfileDto>,
  accessToken: string
) {
  return await axios.patch(
    getFullUrl(accountId, profileId),
    data,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function deleteProfileAsync(
  accountId: string,
  profileId: string,
  accessToken: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId),
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function getProfileAsync(profileId: string) {
  return await axios.get(getShortUrl(profileId), axiosConfig);
}

export async function getAllProfilesFromAccountAsync(
  accountId: string,
  accessToken: string
) {
  return await axios.get(
    getFullUrl(accountId),
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function getAllProfilesAsync() {
  return await axios.get(getShortUrl(), axiosConfig);
}

function getFullUrl(accountId: string, profileId?: string) {
  const hasProfileId = profileId ? `/${profileId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles${hasProfileId}`;
}

function getShortUrl(profileId?: string) {
  const hasProfileId = profileId ? `/${profileId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles${hasProfileId}`;
}
