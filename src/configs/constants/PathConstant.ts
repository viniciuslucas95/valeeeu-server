import { join } from 'path';

export class PathConstant {
  static readonly __rootfile = join(__dirname, '../', '../', '..');
  static readonly imageStoragePath = join(
    this.__rootfile,
    '../',
    'image-storage'
  );
}
