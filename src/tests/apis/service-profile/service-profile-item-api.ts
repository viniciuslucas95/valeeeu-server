import axios from 'axios';
import { IServiceProfileItemDto } from '../../../api/entities/dtos/service-profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import { axiosConfig } from '../../axios-config';
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
  data: Partial<IServiceProfileItemDto>
) {
  return await axios.post(
    getFullUrl(accountId, profileId, serviceId),
    data,
    axiosConfig
  );
}

export async function updateServiceProfileItemAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  itemId: string,
  data: Partial<IServiceProfileItemDto>
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, serviceId, itemId),
    data,
    axiosConfig
  );
}

export async function deleteServiceProfileItemAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  itemId: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, serviceId, itemId),
    axiosConfig
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
