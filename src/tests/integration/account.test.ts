import { IAccountCredentialsDto } from '../../api/entities/dtos';
import {
  createAccountAsync,
  deleteAccountAsync,
  generateRandomAccount,
  generateRandomEmail,
  generateRandomPassword,
  getAccountAsync,
  updateAccountAsync,
} from '../apis/account-api';

let account: IAccountCredentialsDto;
let accountId: string;

beforeAll(() => {
  account = generateRandomAccount();
});

describe('Account routes should', () => {
  describe('succeed on', () => {
    test('creating a new account', async () => {
      const { status, data } = await createAccountAsync(account);
      accountId = data.id;
      expect(status).toBe(201);
    });
  });

  describe('fail on', () => {
    describe('creating a new account', () => {
      test('because of duplicated email', async () => {
        const { status } = await createAccountAsync(account);
        expect(status).toBe(409);
      });
    });

    describe('updating', () => {
      describe('account email', () => {
        test('because of duplicated email', async () => {
          const { status } = await updateAccountAsync(accountId, {
            email: account.email,
          });
          expect(status).toBe(409);
        });

        test('because of wrong email format', async () => {
          const { status } = await updateAccountAsync(accountId, {
            email: 'lili@hotmail..com',
          });
          expect(status).toBe(400);
        });
      });

      describe('account password', () => {
        test('because of short password', async () => {
          const { status } = await updateAccountAsync(accountId, {
            password: '1234',
          });
          expect(status).toBe(400);
        });
      });
    });
  });

  describe('succeed on', () => {
    describe('updating', () => {
      test('account email', async () => {
        const { status } = await updateAccountAsync(accountId, {
          email: generateRandomEmail(),
        });
        expect(status).toBe(204);
      });

      test('account password', async () => {
        const { status } = await updateAccountAsync(accountId, {
          password: generateRandomPassword(),
        });
        expect(status).toBe(204);
      });

      test('both account credentials', async () => {
        const { status } = await updateAccountAsync(accountId, {
          email: generateRandomEmail(),
          password: generateRandomPassword(),
        });
        expect(status).toBe(204);
      });
    });

    test('getting account', async () => {
      const { status } = await getAccountAsync(accountId);
      expect(status).toBe(200);
    });

    test('deleting account', async () => {
      const { status } = await deleteAccountAsync(accountId);
      expect(status).toBe(204);
    });
  });

  describe('fail on', () => {
    describe('creating a new account', () => {
      test('because of wrong email format', async () => {
        const { status } = await createAccountAsync({
          email: 'kakaka@gmail',
          password: '123456',
        });
        expect(status).toBe(400);
      });

      test('because of short password', async () => {
        const { status } = await createAccountAsync({
          email: 'lulululu@gmail.com',
          password: '123',
        });
        expect(status).toBe(400);
      });

      test('because of null email', async () => {
        const { status } = await createAccountAsync({
          password: '1234567',
        });
        expect(status).toBe(400);
      });

      test('because of null password', async () => {
        const { status } = await createAccountAsync({
          email: 'lalalalalala@gmail.com',
        });
        expect(status).toBe(400);
      });
    });
  });
});
