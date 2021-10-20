import { IProfileDto } from '../../../api/entities/dtos/profile-dtos';
import {
  IServiceProfileDto,
  IServiceProfileTagDto,
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
import { generateRandomTitle } from '../../apis/profile/profile-contact-api';
import {
  createServiceProfileAsync,
  generateRandomServiceProfile,
} from '../../apis/service-profile/service-profile-api';
import {
  createServiceProfileTagAsync,
  deleteServiceProfileTagAsync,
  generateRandomServiceProfileTag,
  updateServiceProfileTagAsync,
} from '../../apis/service-profile/service-profile-tag-api';

let serviceProfileTag: IServiceProfileTagDto;
let serviceProfileTagId: string;
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
  serviceProfileTag = generateRandomServiceProfileTag();
});

describe('Service tag routes should', () => {
  describe('succeed on', () => {
    test('creating a new service tag', async () => {
      const { data, status } = await createServiceProfileTagAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfileTag
      );
      serviceProfileTagId = data.id;
      expect(status).toBe(201);
    });

    test('updating service tag', async () => {
      const { status } = await updateServiceProfileTagAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfileTagId,
        {
          tag: generateRandomTitle(),
        }
      );
      expect(status).toBe(204);
    });

    test('deleting service tag', async () => {
      const { status } = await deleteServiceProfileTagAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfileTagId
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
