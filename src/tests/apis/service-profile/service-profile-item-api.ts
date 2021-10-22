import axios from 'axios';
import { IServiceProfileItemDto } from '../../../api/entities/dtos/service-profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import {
  axiosConfig,
  getAxiosConfigWithAccessTokenHeader,
} from '../../axios-config';
import { generateRandomTitle } from '../profile/profile-contact-api';

export function generateRandomServiceProfileItem(): IServiceProfileItemDto {
  return { item: generateRandomTitle(), price: generateRandomPrice() };
}

export function generateRandomPrice() {
  return Math.random() * 100;
}

export async function createServiceProfileItemAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  data: Partial<IServiceProfileItemDto>,
  accessToken: string
) {
  return await axios.post(
    getFullUrl(accountId, profileId, serviceId),
    data,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function updateServiceProfileItemAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  itemId: string,
  data: Partial<IServiceProfileItemDto>,
  accessToken: string
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, serviceId, itemId),
    data,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function deleteServiceProfileItemAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  itemId: string,
  accessToken: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, serviceId, itemId),
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function getServiceProfileItemAsync(
  profileId: string,
  serviceId: string,
  itemId: string
) {
  return await axios.get(
    getShortUrl(profileId, serviceId, itemId),
    axiosConfig
  );
}

export async function getAllServiceProfileItemsAsync(
  profileId: string,
  serviceId: string
) {
  return await axios.get(getShortUrl(profileId, serviceId), axiosConfig);
}

function getFullUrl(
  accountId: string,
  profileId: string,
  serviceId: string,
  itemId?: string
) {
  const hasItemId = itemId ? `/${itemId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles/${profileId}/services/${serviceId}/items${hasItemId}`;
}

function getShortUrl(profileId: string, serviceId: string, itemId?: string) {
  const hasItemId = itemId ? `/${itemId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${profileId}/services/${serviceId}/items${hasItemId}`;
}
