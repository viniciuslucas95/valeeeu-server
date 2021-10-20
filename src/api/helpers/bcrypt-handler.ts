import { genSalt, hash, compare } from 'bcrypt';

export class BcryptHandler {
  static async hashDataAsync(data: string) {
    const salt = await genSalt();
    return await hash(data, salt);
  }

  static async compareDataAsync(data: string, hash: string) {
    return compare(data, hash);
  }
}
