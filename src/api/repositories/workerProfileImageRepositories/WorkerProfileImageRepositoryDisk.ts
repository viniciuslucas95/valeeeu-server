import { ReadStream } from 'fs';
import { PipelineSource } from 'stream';
import { FileHandler, StreamHandler } from '../../helpers';
import { BaseRepositoryDisk } from '../bases';

export class WorkerProfileImageRepositoryDisk extends BaseRepositoryDisk {
  async createAsync(
    id: string,
    data: PipelineSource<ReadStream>
  ): Promise<void> {
    const streamHandler = new StreamHandler();
    await streamHandler.writeAsync(data, this.formatPath(id));
  }

  async checkExistanceByIdAsync(id: string): Promise<boolean> {
    try {
      const fileHandler = new FileHandler();
      await fileHandler.checkExistanceAsync(this.formatPath(id));
      return true;
    } catch (_) {
      return false;
    }
  }

  private formatPath(id: string) {
    return `${this.storagePath}/${id}.jpg`;
  }
}
