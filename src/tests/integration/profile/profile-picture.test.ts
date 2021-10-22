import {
  IProfileDto,
  IProfilePictureDto,
} from '../../../api/entities/dtos/profile-dtos';
import {
  createAccountAsync,
  deleteAccountAsync,
  generateRandomAccount,
} from '../../apis/account-api';
import { getTokensAsync } from '../../apis/auth-api';
import {
  createProfileAsync,
  generateRandomProfile,
} from '../../apis/profile/profile-api';
import {
  createProfilePictureAsync,
  deleteProfilePictureAsync,
  getAllProfilePicturesAsync,
  getProfilePictureAsync,
  updateProfilePictureAsync,
} from '../../apis/profile/profile-picture-api';
import { getJpgPicture, getPngPicture } from '../../example-picture-handler';

let picture: IProfilePictureDto;
let pictureId: string;
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
  const { data: profileData } = await createProfileAsync(
    accountId,
    profile,
    accessToken
  );
  profileId = profileData.id;
  picture = { picture: await getPngPicture() };
});

describe('Profile picture routes should', () => {
  describe('succeed on', () => {
    test('creating a new profile picture', async () => {
      const { status, data } = await createProfilePictureAsync(
        accountId,
        profileId,
        picture,
        accessToken
      );
      pictureId = data.id;
      expect(status).toBe(201);
    });

    test('getting profile picture', async () => {
      const { status, data } = await getProfilePictureAsync(
        profileId,
        pictureId
      );
      expect(data).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting all profile pictures', async () => {
      const { status, data } = await getAllProfilePicturesAsync(profileId);
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    test('updating profile picture', async () => {
      const { status } = await updateProfilePictureAsync(
        accountId,
        profileId,
        pictureId,
        {
          picture: await getJpgPicture(),
        },
        accessToken
      );
      expect(status).toBe(204);
    });

    test('deleting profile picture', async () => {
      const { status } = await deleteProfilePictureAsync(
        accountId,
        profileId,
        pictureId,
        accessToken
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId, accessToken);
});
