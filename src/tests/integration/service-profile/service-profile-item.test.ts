import { IProfileDto } from '../../../api/entities/dtos/profile-dtos';
import {
  IServiceProfileDto,
  IServiceProfileItemDto,
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
  createServiceProfileItemAsync,
  deleteServiceProfileItemAsync,
  generateRandomPrice,
  generateRandomServiceProfileItem,
  getAllServiceProfileItemsAsync,
  getServiceProfileItemAsync,
  updateServiceProfileItemAsync,
} from '../../apis/service-profile/service-profile-item-api';

let serviceProfileItem: IServiceProfileItemDto;
let serviceProfileItemId: string;
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
  serviceProfileItem = generateRandomServiceProfileItem();
});

describe('Service item routes should', () => {
  describe('succeed on', () => {
    test('creating a new service item', async () => {
      const { data, status } = await createServiceProfileItemAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfileItem
      );
      serviceProfileItemId = data.id;
      expect(status).toBe(201);
    });

    test('getting service profile item', async () => {
      const { status, data } = await getServiceProfileItemAsync(
        profileId,
        serviceProfileId,
        serviceProfileItemId
      );
      expect(data).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting all service items', async () => {
      const { status, data } = await getAllServiceProfileItemsAsync(
        profileId,
        serviceProfileId
      );
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    describe('updating service item', () => {
      test('item', async () => {
        const { status } = await updateServiceProfileItemAsync(
          accountId,
          profileId,
          serviceProfileId,
          serviceProfileItemId,
          {
            item: generateRandomTitle(),
          }
        );
        expect(status).toBe(204);
      });

      test('price', async () => {
        const { status } = await updateServiceProfileItemAsync(
          accountId,
          profileId,
          serviceProfileId,
          serviceProfileItemId,
          {
            price: generateRandomPrice(),
          }
        );
        expect(status).toBe(204);
      });

      test('item and price', async () => {
        const { status } = await updateServiceProfileItemAsync(
          accountId,
          profileId,
          serviceProfileId,
          serviceProfileItemId,
          {
            item: generateRandomTitle(),
            price: generateRandomPrice(),
          }
        );
        expect(status).toBe(204);
      });
    });

    test('deleting service item', async () => {
      const { status } = await deleteServiceProfileItemAsync(
        accountId,
        profileId,
        serviceProfileId,
        serviceProfileItemId
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
