import axios from 'axios';
import { IProfilePictureDto } from '../../../api/entities/dtos/profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import { axiosConfig } from '../../axios-config';

export async function createProfilePictureAsync(
  accountId: string,
  profileId: string,
  data: Partial<IProfilePictureDto>
) {
  return await axios.post(getFullUrl(accountId, profileId), data, axiosConfig);
}

export async function updateProfilePictureAsync(
  accountId: string,
  profileId: string,
  pictureId: string,
  data: Partial<IProfilePictureDto>
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, pictureId),
    data,
    axiosConfig
  );
}

export async function deleteProfilePictureAsync(
  accountId: string,
  profileId: string,
  pictureId: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, pictureId),
    axiosConfig
  );
}

export async function getProfilePictureAsync(
  profileId: string,
  pictureId: string
) {
  return await axios.get(getShortUrl(profileId, pictureId), axiosConfig);
}

export async function getAllProfilePicturesAsync(profileId: string) {
  return await axios.get(getShortUrl(profileId), axiosConfig);
}

function getFullUrl(accountId: string, profileId: string, pictureId?: string) {
  const hasPictureId = pictureId ? `/${pictureId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles/${profileId}/pictures${hasPictureId}`;
}

function getShortUrl(profileId: string, pictureId?: string) {
  const hasPictureId = pictureId ? `/${pictureId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${profileId}/pictures${hasPictureId}`;
}
