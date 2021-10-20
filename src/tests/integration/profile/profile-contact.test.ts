import {
  IProfileContactDto,
  IProfileDto,
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
  createProfileContactAsync,
  deleteProfileContactAsync,
  generateRandomContact,
  generateRandomTitle,
  getAllProfileContactsAsync,
  getProfileContactAsync,
  updateProfileContactAsync,
} from '../../apis/profile/profile-contact-api';

let contact: IProfileContactDto;
let contactId: string;
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
  contact = generateRandomContact();
});

describe('Profile contact routes should', () => {
  describe('succeed on', () => {
    test('creating a new profile contact', async () => {
      const { data, status } = await createProfileContactAsync(
        accountId,
        profileId,
        contact
      );
      contactId = data.id;
      expect(status).toBe(201);
    });

    test('getting profile contact', async () => {
      const { status, data } = await getProfileContactAsync(
        profileId,
        contactId
      );
      expect(data).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting all profile contacts', async () => {
      const { status, data } = await getAllProfileContactsAsync(profileId);
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    describe('updating profile contact', () => {
      test('plataform', async () => {
        const { status } = await updateProfileContactAsync(
          accountId,
          profileId,
          contactId,
          {
            plataform: generateRandomTitle(),
          }
        );
        expect(status).toBe(204);
      });

      test('contact', async () => {
        const { status } = await updateProfileContactAsync(
          accountId,
          profileId,
          contactId,
          {
            contact: generateRandomTitle(),
          }
        );
        expect(status).toBe(204);
      });

      test('plataform and contact', async () => {
        const { status } = await updateProfileContactAsync(
          accountId,
          profileId,
          contactId,
          {
            plataform: generateRandomTitle(),
            contact: generateRandomTitle(),
          }
        );
        expect(status).toBe(204);
      });
    });

    test('deleting profile contact', async () => {
      const { status } = await deleteProfileContactAsync(
        accountId,
        profileId,
        contactId
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
