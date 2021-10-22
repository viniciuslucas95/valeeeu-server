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
import { getTokensAsync } from '../../apis/auth-api';
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
  getAllServiceProfileTagsAsync,
  getServiceProfileTagAsync,
  updateServiceProfileTagAsync,
} from '../../apis/service-profile/service-profile-tag-api';

let serviceProfileTag: IServiceProfileTagDto;
let serviceProfileTagId: string;
let serviceProfile: IServiceProfileDto;
let serviceProfileId: string;
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
  serviceProfile = generateRandomServiceProfile();
  const { data: serviceProfileData } = await createServiceProfileAsync(
    accountId,
    profileId,
    serviceProfile,
    accessToken
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
        serviceProfileTag,
        accessToken
      );
      serviceProfileTagId = data.id;
      expect(status).toBe(201);
    });

    test('getting service profile tag', async () => {
      const { status, data } = await getServiceProfileTagAsync(
        profileId,
        serviceProfileId,
        serviceProfileTagId
      );
      expect(data).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting all service tags', async () => {
      const { status, data } = await getAllServiceProfileTagsAsync(
        profileId,
        serviceProfileId
      );
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    test('updating service tag', async () => {
      const { status } = await updateServiceProfileTagAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfileTagId,
        {
          tag: generateRandomTitle(),
        },
        accessToken
      );
      expect(status).toBe(204);
    });

    test('deleting service tag', async () => {
      const { status } = await deleteServiceProfileTagAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfileTagId,
        accessToken
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId, accessToken);
});
