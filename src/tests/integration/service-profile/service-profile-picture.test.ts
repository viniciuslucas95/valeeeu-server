import { IProfileDto } from '../../../api/entities/dtos/profile-dtos';
import {
  IServiceProfileDto,
  IServiceProfilePictureDto,
} from '../../../api/entities/dtos/service-profile-dtos';
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
  createServiceProfileAsync,
  generateRandomServiceProfile,
} from '../../apis/service-profile/service-profile-api';
import {
  createServiceProfilePictureAsync,
  deleteServiceProfilePictureAsync,
  updateServiceProfilePictureAsync,
} from '../../apis/service-profile/service-profile-picture-api';
import { getJpgPicture, getPngPicture } from '../../example-picture-handler';

let serviceProfilePicture: IServiceProfilePictureDto;
let serviceProfilePictureId: string;
let serviceProfile: IServiceProfileDto;
let serviceProfileId: string;
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
  serviceProfile = generateRandomServiceProfile();
  const { data: serviceProfileData } = await createServiceProfileAsync(
    accountId,
    profileId,
    serviceProfile
  );
  serviceProfileId = serviceProfileData.id;
  serviceProfilePicture = { picture: await getPngPicture() };
});

describe('Service picture routes should', () => {
  describe('succeed on', () => {
    test('creating a new service picture', async () => {
      const { data, status } = await createServiceProfilePictureAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfilePicture
      );
      serviceProfilePictureId = data.id;
      expect(status).toBe(201);
    });

    test('updating service picture', async () => {
      const { status } = await updateServiceProfilePictureAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfilePictureId,
        {
          picture: await getJpgPicture(),
        }
      );
      expect(status).toBe(204);
    });

    test('deleting service picture', async () => {
      const { status } = await deleteServiceProfilePictureAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfilePictureId
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
