export function getAxiosConfig(accessToken: string) {
  return {
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
    validateStatus: null,
  };
}
