import { IAccountDto } from '../../api/entities/dtos';
import {
  createAccountAsync,
  deleteAccountAsync,
  generateRandomAccount,
} from '../apis/account-api';
import {
  getNewAccessTokenAsync,
  getTokensAsync,
  verifyAccessTokenAsync,
} from '../apis/auth-api';

let account: IAccountDto;
let accountId: string;
let accessToken: string;
let refreshToken: string;

beforeAll(async () => {
  account = generateRandomAccount();
  const { data } = await createAccountAsync(account);
  accountId = data.id;
});

describe('Auth routes should', () => {
  describe('succeed on', () => {
    test('getting tokens', async () => {
      const { email, password } = account;
      const { status, data } = await getTokensAsync(account);
      refreshToken = data.refreshToken;
      accessToken = data.accessToken;
      expect(data.refreshToken).toBeTruthy();
      expect(data.accessToken).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting new access token', async () => {
      const oldAccessToken = accessToken;
      const { status, data } = await getNewAccessTokenAsync(refreshToken);
      accessToken = data.accessToken;
      expect(data.accessToken).toBeTruthy();
      expect(oldAccessToken).not.toEqual(accessToken);
      expect(status).toBe(200);
    });

    test('verifying access token', async () => {
      const { status } = await verifyAccessTokenAsync(accessToken);
      expect(status).toBe(200);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId, accessToken);
});
