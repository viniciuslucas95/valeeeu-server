import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export class FileHandler {
  static async readAsBase64Async(path: string) {
    return await readFileAsync(path, { encoding: 'base64' });
  }
}
