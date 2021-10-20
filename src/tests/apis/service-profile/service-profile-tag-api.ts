import axios from 'axios';
import { IServiceProfileTagDto } from '../../../api/entities/dtos/service-profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import { axiosConfig } from '../../axios-config';
import { generateRandomTitle } from '../profile/profile-contact-api';

export function generateRandomServiceProfileTag(): IServiceProfileTagDto {
  return { tag: generateRandomTitle() };
}

export async function createServiceProfileTagAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  data: Partial<IServiceProfileTagDto>
) {
  return await axios.post(
    getFullUrl(accountId, profileId, serviceId),
    data,
    axiosConfig
  );
}

export async function updateServiceProfileTagAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  tagId: string,
  data: Partial<IServiceProfileTagDto>
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, serviceId, tagId),
    data,
    axiosConfig
  );
}

export async function deleteServiceProfileTagAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  tagId: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, serviceId, tagId),
    axiosConfig
  );
}

export async function getServiceProfileTagAsync(
  profileId: string,
  serviceId: string,
  tagId: string
) {
  return await axios.get(getShortUrl(profileId, serviceId, tagId), axiosConfig);
}

export async function getAllServiceProfileTagsAsync(
  profileId: string,
  serviceId: string
) {
  return await axios.get(getShortUrl(profileId, serviceId), axiosConfig);
}

function getFullUrl(
  accountId: string,
  profileId: string,
  serviceId: string,
  tagId?: string
) {
  const hasTagId = tagId ? `/${tagId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles/${profileId}/services/${serviceId}/tags${hasTagId}`;
}

function getShortUrl(profileId: string, serviceId: string, tagId?: string) {
  const hasTagId = tagId ? `/${tagId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${profileId}/services/${serviceId}/tags${hasTagId}`;
}
