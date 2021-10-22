import { AxiosRequestConfig } from 'axios';

export const axiosConfig: AxiosRequestConfig = {
  validateStatus: null,
};

export function getAxiosConfigWithAccessTokenHeader(
  accessToken: string
): AxiosRequestConfig {
  return {
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
    validateStatus: null,
  };
}
