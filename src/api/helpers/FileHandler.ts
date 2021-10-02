import { access } from 'fs';
import { promisify } from 'util';

const accessAsync = promisify(access);

export class FileHandler {
  async checkExistanceAsync(path: string) {
    await accessAsync(path);
  }
}
