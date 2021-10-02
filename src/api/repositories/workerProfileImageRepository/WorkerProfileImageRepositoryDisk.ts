import { ReadStream } from 'fs';
import { PipelineSource } from 'stream';
import { BaseRepositoryDisk } from '../BaseRepositoryDisk';

export class WorkerProfileImageRepositoryDisk extends BaseRepositoryDisk {
  async createAsync(
    id: string,
    data: PipelineSource<ReadStream>
  ): Promise<void> {
    await this.streamHandler.writeAsync(data, this.formatPath(id));
  }

  private formatPath(id: string) {
    return `${this.storagePath}/${id}.jpg`;
  }
}
