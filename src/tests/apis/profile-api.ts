import axios from 'axios';
import { name } from 'faker';
import { EnvironmentConfig } from '../../configs';
import { axiosConfig } from '../axios-config';

const { findName } = name;

interface IProfile {
  name: string;
}

export function generateRandomProfile(): IProfile {
  return { name: generateRandomName() };
}

export function generateRandomName() {
  return findName();
}

export async function createProfileAsync(
  accountId: string,
  data: Partial<IProfile>
) {
  return await axios.post(getAccountUrl(accountId), data, axiosConfig);
}

export async function updateProfileAsync(
  accountId: string,
  profileId: string,
  data: Partial<IProfile>
) {
  return await axios.patch(
    getAccountUrl(accountId, profileId),
    data,
    axiosConfig
  );
}

export async function deleteProfileAsync(accountId: string, profileId: string) {
  return await axios.delete(getAccountUrl(accountId, profileId), axiosConfig);
}

export async function getProfileAsync(profileId: string) {
  return await axios.get(getProfileUrl(profileId), axiosConfig);
}

export async function getAllProfilesAsync() {
  return await axios.get(getProfileUrl(), axiosConfig);
}

function getAccountUrl(accountId: string, profileId?: string) {
  const hasProfileId = profileId ? `/${profileId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles${hasProfileId}`;
}

function getProfileUrl(profileId?: string) {
  const hasProfileId = profileId ? `/${profileId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles${hasProfileId}`;
}
