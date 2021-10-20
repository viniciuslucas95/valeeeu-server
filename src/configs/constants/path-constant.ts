import { join } from 'path';

export class PathConstant {
  static readonly rootFolder = join(__dirname, '..', '..', '..');
  static readonly publicFolder = join(this.rootFolder, 'public');
}
