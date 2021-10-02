import { StreamHandler } from '../helpers';

export abstract class BaseRepositoryDisk {
  protected readonly streamHandler = new StreamHandler();

  constructor(protected readonly storagePath: string) {}
}
