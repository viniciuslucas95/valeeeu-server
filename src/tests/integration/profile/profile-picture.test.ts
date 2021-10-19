import {
  IProfileDto,
  IProfilePictureDto,
} from '../../../api/entities/dtos/profile-dtos';
import {
  createAccountAsync,
  deleteAccountAsync,
  generateRandomAccount,
} from '../../apis/account-api';
import {
  createProfileAsync,
  generateRandomProfile,
} from '../../apis/profile/profile-api';
import {
  createProfilePictureAsync,
  deleteProfilePictureAsync,
  updateProfilePictureAsync,
} from '../../apis/profile/profile-picture-api';
import { getJpgPicture, getPngPicture } from '../../example-picture-handler';

let picture: IProfilePictureDto;
let pictureId: string;
let profile: IProfileDto;
let profileId: string;
let accountId: string;

beforeAll(async () => {
  const account = generateRandomAccount();
  const { data: accountData } = await createAccountAsync(account);
  accountId = accountData.id;
  profile = generateRandomProfile();
  const { data: profileData } = await createProfileAsync(accountId, profile);
  profileId = profileData.id;
  picture = { picture: await getPngPicture() };
});

describe('Profile picture routes should', () => {
  describe('succeed on', () => {
    test('creating a new profile picture', async () => {
      const { status, data } = await createProfilePictureAsync(
        accountId,
        profileId,
        picture
      );
      pictureId = data.id;
      expect(status).toBe(201);
    });

    test('updating profile picture', async () => {
      const { status } = await updateProfilePictureAsync(
        accountId,
        profileId,
        pictureId,
        {
          picture: await getJpgPicture(),
        }
      );
      expect(status).toBe(204);
    });

    test('deleting profile picture', async () => {
      const { status } = await deleteProfilePictureAsync(
        accountId,
        profileId,
        pictureId
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
