import axios from 'axios';
import { name } from 'faker';
import { IProfileContactDto } from '../../../api/entities/dtos/profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import { axiosConfig } from '../../axios-config';

const { title } = name;

export function generateRandomContact(): IProfileContactDto {
  return { plataform: generateRandomTitle(), contact: generateRandomTitle() };
}

export function generateRandomTitle() {
  return title();
}

export async function createProfileContactAsync(
  accountId: string,
  profileId: string,
  data: Partial<IProfileContactDto>
) {
  return await axios.post(getFullUrl(accountId, profileId), data, axiosConfig);
}

export async function updateProfileContactAsync(
  accountId: string,
  profileId: string,
  contactId: string,
  data: Partial<IProfileContactDto>
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, contactId),
    data,
    axiosConfig
  );
}

export async function deleteProfileContactAsync(
  accountId: string,
  profileId: string,
  contactId: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, contactId),
    axiosConfig
  );
}

export async function getProfileContactAsync(
  profileId: string,
  contactId: string
) {
  return await axios.get(getShortUrl(profileId, contactId), axiosConfig);
}

export async function getAllProfileContactsAsync(profileId: string) {
  return await axios.get(getShortUrl(profileId), axiosConfig);
}

function getFullUrl(accountId: string, profileId: string, contactId?: string) {
  const hasContactId = contactId ? `/${contactId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles/${profileId}/contacts${hasContactId}`;
}

function getShortUrl(profileId: string, contactId?: string) {
  const hasContactId = contactId ? `/${contactId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${profileId}/contacts${hasContactId}`;
}
