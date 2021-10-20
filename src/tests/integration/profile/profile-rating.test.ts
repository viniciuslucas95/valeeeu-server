import {
  IProfileDto,
  IProfileRatingDto,
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
  createProfileRatingAsync,
  generateRandomComment,
  generateRandomRatingNumber,
  generateRandomRating,
  updateProfileRatingAsync,
  deleteProfileRatingAsync,
  getAllProfileRatingsAsync,
  getProfileRatingAsync,
} from '../../apis/profile/profile-rating-api';

let rating: IProfileRatingDto;
let ratingId: string;
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
  rating = generateRandomRating();
});

describe('Profile rating routes should', () => {
  describe('succeed on', () => {
    test('creating a new profile rating', async () => {
      const { status, data } = await createProfileRatingAsync(
        accountId,
        profileId,
        rating
      );
      ratingId = data.id;
      expect(status).toBe(201);
    });

    test('getting profile rating', async () => {
      const { status, data } = await getProfileRatingAsync(profileId, ratingId);
      expect(data).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting all profile ratings', async () => {
      const { status, data } = await getAllProfileRatingsAsync(profileId);
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    describe('updating profile rating', () => {
      test('rating', async () => {
        const { status } = await updateProfileRatingAsync(
          accountId,
          profileId,
          ratingId,
          {
            rating: generateRandomRatingNumber(),
          }
        );
        expect(status).toBe(204);
      });

      test('comment', async () => {
        const { status } = await updateProfileRatingAsync(
          accountId,
          profileId,
          ratingId,
          {
            comment: generateRandomComment(),
          }
        );
        expect(status).toBe(204);
      });

      test('rating and comment', async () => {
        const { status } = await updateProfileRatingAsync(
          accountId,
          profileId,
          ratingId,
          {
            rating: generateRandomRatingNumber(),
            comment: generateRandomComment(),
          }
        );
        expect(status).toBe(204);
      });
    });

    test('deleting profile rating', async () => {
      const { status } = await deleteProfileRatingAsync(
        accountId,
        profileId,
        ratingId
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
