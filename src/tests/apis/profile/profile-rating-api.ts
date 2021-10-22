import axios from 'axios';
import { datatype, lorem } from 'faker';
import {
  IProfileContactDto,
  IProfileRatingDto,
} from '../../../api/entities/dtos/profile-dtos';
import { EnvironmentConfig } from '../../../configs';
import {
  axiosConfig,
  getAxiosConfigWithAccessTokenHeader,
} from '../../axios-config';

const { number } = datatype;
const { text } = lorem;

export function generateRandomRating(): IProfileRatingDto {
  return {
    rating: generateRandomRatingNumber(),
    comment: generateRandomComment(),
  };
}

export function generateRandomRatingNumber() {
  return number({
    min: 1,
    max: 5,
  });
}

export function generateRandomComment() {
  return text();
}

export async function createProfileRatingAsync(
  accountId: string,
  profileId: string,
  data: Partial<IProfileRatingDto>,
  accessToken: string
) {
  return await axios.post(
    getFullUrl(accountId, profileId),
    data,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function updateProfileRatingAsync(
  accountId: string,
  profileId: string,
  ratingId: string,
  data: Partial<IProfileRatingDto>,
  accessToken: string
) {
  return await axios.patch(
    getFullUrl(accountId, profileId, ratingId),
    data,
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function deleteProfileRatingAsync(
  accountId: string,
  profileId: string,
  ratingId: string,
  accessToken: string
) {
  return await axios.delete(
    getFullUrl(accountId, profileId, ratingId),
    getAxiosConfigWithAccessTokenHeader(accessToken)
  );
}

export async function getProfileRatingAsync(
  profileId: string,
  ratingId: string
) {
  return await axios.get(getShortUrl(profileId, ratingId), axiosConfig);
}

export async function getAllProfileRatingsAsync(profileId: string) {
  return await axios.get(getShortUrl(profileId), axiosConfig);
}

function getFullUrl(accountId: string, profileId: string, ratingId?: string) {
  const hasRatingId = ratingId ? `/${ratingId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/accounts/${accountId}/profiles/${profileId}/ratings${hasRatingId}`;
}

function getShortUrl(profileId: string, ratingId?: string) {
  const hasRatingId = ratingId ? `/${ratingId}` : '';
  return `http://localhost:${EnvironmentConfig.serverPort}/profiles/${profileId}/ratings${hasRatingId}`;
}
