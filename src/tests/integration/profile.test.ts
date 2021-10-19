import {
  createAccountAsync,
  deleteAccountAsync,
  generateRandomAccount,
} from '../apis/account-api';
import {
  createProfileAsync,
  deleteProfileAsync,
  generateRandomName,
  generateRandomProfile,
  getAllProfilesAsync,
  getProfileAsync,
  updateProfileAsync,
} from '../apis/profile-api';

let profile: { name: string };
let profileId: string;
let accountId: string;

beforeAll(async () => {
  const account = generateRandomAccount();
  const { data } = await createAccountAsync(account);
  accountId = data.id;
  profile = generateRandomProfile();
});

describe('Profile routes should', () => {
  describe('succeed on', () => {
    test('creating a new profile', async () => {
      const { status, data } = await createProfileAsync(accountId, profile);
      profileId = data.id;
      expect(status).toBe(201);
    });

    test('updating profile name', async () => {
      const { status } = await updateProfileAsync(accountId, profileId, {
        name: generateRandomName(),
      });
      expect(status).toBe(204);
    });

    test('getting profile', async () => {
      const { status } = await getProfileAsync(profileId);
      expect(status).toBe(200);
    });

    test('getting all profiles', async () => {
      const { status } = await getAllProfilesAsync();
      expect(status).toBe(200);
    });

    test('deleting profile', async () => {
      const { status } = await deleteProfileAsync(accountId, profileId);
      expect(status).toBe(204);
    });
  });

  describe('fail on', () => {
    test('updating profile name', async () => {
      const { status } = await updateProfileAsync(
        accountId,
        profileId,
        {} as { name: string }
      );
      expect(status).toBe(400);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
