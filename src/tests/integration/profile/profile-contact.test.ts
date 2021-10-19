import {
  IProfileContactDto,
  IProfileDto,
} from '../../../api/entities/dtos/profiles-dtos';
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

    describe('updating', () => {
      test('profile contact plataform', async () => {
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

      test('profile contact contact', async () => {
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

      test('profile contact plataform and contact', async () => {
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
