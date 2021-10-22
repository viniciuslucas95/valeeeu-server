import { randomUUID } from 'crypto';

export class DataHandler {
  static generateRandomId() {
    return randomUUID().replace(/[-]/gm, '');
  }
}
