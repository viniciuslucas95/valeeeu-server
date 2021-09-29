import {
  genSalt,
  hash,
  compare,
  compareSync,
  hashSync,
  genSaltSync,
} from 'bcrypt';

export class BcryptHandler {
  async hashDataAsync(data: string) {
    const salt = await genSalt();
    return await hash(data, salt);
  }

  hashData(data: string) {
    const salt = genSaltSync();
    return hashSync(data, salt);
  }

  compareDataAsync = (data: string, hash: string) => compare(data, hash);

  compareData = (data: string, hash: string) => compareSync(data, hash);
}
