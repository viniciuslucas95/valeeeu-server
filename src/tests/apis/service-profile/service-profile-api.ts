import axios from 'axios';
import { IServiceProfileDto } from '../../../api/entities/dtos/service-profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import { axiosConfig } from '../../axios-config';
import { generateRandomComment } from '../profile/profile-rating-api';

export function generateRandomServiceProfile(): IServiceProfileDto {
  return { description: generateRandomComment() };
}

export async function createServiceProfileAsync(
  accountId: string,
  profileId: string,
  data: Partial<IServiceProfileDto>
) {
  return await axios.post(getFullUrl(accountId, profileId), data, axiosConfig);
}

export async function updateServiceProfileAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  data: Partial<IServiceProfileDto>
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, serviceId),
    data,
    axiosConfig
  );
}

export async function deleteServiceProfileAsync(
  accountId: string,
  profileId: string,
  serviceId: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, serviceId),
    axiosConfig
  );
}

export async function getServiceProfileAsync(
  profileId: string,
  serviceId: string
) {
  return await axios.get(getShortUrlWithIds(profileId, serviceId), axiosConfig);
}

export async function getAllServiceProfilesFromProfileAsync(profileId: string) {
  return await axios.get(getShortUrlWithoutIds(profileId), axiosConfig);
}

export async function getAllServiceProfilesAsync() {
  return await axios.get(getShortUrlWithoutIds(), axiosConfig);
}

function getFullUrl(accountId: string, profileId: string, serviceId?: string) {
  const hasServiceId = serviceId ? `/${serviceId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles/${profileId}/services${hasServiceId}`;
}

function getShortUrlWithIds(profileId: string, serviceId: string) {
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${profileId}/services/${serviceId}`;
}

function getShortUrlWithoutIds(profileId?: string) {
  const hasProfileIdId = profileId ? `${profileId}/` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${hasProfileIdId}services`;
}
