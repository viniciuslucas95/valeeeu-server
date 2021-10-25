import { IProfileDto } from '../../../api/entities/dtos/profile-dtos';
import {
  createAccountAsync,
  deleteAccountAsync,
  generateRandomAccount,
} from '../../apis/account-api';
import { getTokensAsync } from '../../apis/auth-api';
import {
  createProfileAsync,
  deleteProfileAsync,
  generateRandomName,
  generateRandomProfile,
  getAllProfilesAsync,
  getAllProfilesFromAccountAsync,
  getProfileAsync,
  updateProfileAsync,
} from '../../apis/profile/profile-api';

let profile: IProfileDto;
let profileId: string;
let accessToken: string;
let accountId: string;

beforeAll(async () => {
  const account = generateRandomAccount();
  const { data: accountData } = await createAccountAsync(account);
  accountId = accountData.id;
  const { data: tokensData } = await getTokensAsync(account);
  accessToken = tokensData.accessToken;
  profile = generateRandomProfile();
});

describe('Profile routes should', () => {
  describe('succeed on', () => {
    test('creating a new profile', async () => {
      const { status, data } = await createProfileAsync(
        accountId,
        profile,
        accessToken
      );
      profileId = data.id;
      expect(status).toBe(201);
    });

    test('updating profile name', async () => {
      const { status } = await updateProfileAsync(
        accountId,
        profileId,
        {
          name: generateRandomName(),
        },
        accessToken
      );
      expect(status).toBe(204);
    });

    test('getting profile', async () => {
      const { status, data } = await getProfileAsync(profileId);
      expect(data).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting all profiles from account', async () => {
      const { status, data } = await getAllProfilesFromAccountAsync(
        accountId,
        accessToken
      );
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    test('getting all profiles', async () => {
      const { status, data } = await getAllProfilesAsync();
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    test('deleting profile', async () => {
      const { status } = await deleteProfileAsync(
        accountId,
        profileId,
        accessToken
      );
      expect(status).toBe(204);
    });
  });

  describe('fail on', () => {
    test('updating profile name', async () => {
      const { status } = await updateProfileAsync(
        accountId,
        profileId,
        {} as { name: string },
        accessToken
      );
      expect(status).toBe(400);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId, accessToken);
});
