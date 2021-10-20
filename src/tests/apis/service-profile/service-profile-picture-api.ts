import axios from 'axios';
import { IServiceProfilePictureDto } from '../../../api/entities/dtos/service-profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import { axiosConfig } from '../../axios-config';

export async function createServiceProfilePictureAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  data: Partial<IServiceProfilePictureDto>
) {
  return await axios.post(
    getFullUrl(accountId, profileId, serviceId),
    data,
    axiosConfig
  );
}

export async function updateServiceProfilePictureAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  pictureId: string,
  data: Partial<IServiceProfilePictureDto>
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, serviceId, pictureId),
    data,
    axiosConfig
  );
}

export async function deleteServiceProfilePictureAsync(
  accountId: string,
  profileId: string,
  serviceId: string,
  pictureId: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, serviceId, pictureId),
    axiosConfig
  );
}

export async function getServiceProfilePictureAsync(
  profileId: string,
  serviceId: string,
  pictureId: string
) {
  return await axios.get(
    getShortUrl(profileId, serviceId, pictureId),
    axiosConfig
  );
}

export async function getAllServiceProfilePicturesAsync(
  profileId: string,
  serviceId: string
) {
  return await axios.get(getShortUrl(profileId, serviceId), axiosConfig);
}

function getFullUrl(
  accountId: string,
  profileId: string,
  serviceId: string,
  pictureId?: string
) {
  const hasPictureId = pictureId ? `/${pictureId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles/${profileId}/services/${serviceId}/pictures${hasPictureId}`;
}

function getShortUrl(profileId: string, serviceId: string, pictureId?: string) {
  const hasPictureId = pictureId ? `/${pictureId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${profileId}/services/${serviceId}/pictures${hasPictureId}`;
}
