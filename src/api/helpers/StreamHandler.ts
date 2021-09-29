import {
  createReadStream,
  createWriteStream,
  ReadStream,
  WriteStream,
} from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export interface IWriteStream {
  writeAsync(data: ReadStream, path: string): Promise<void>;
}

export interface IReadStream {
  readAsync(path: string, data: WriteStream): Promise<void>;
}

export class StreamHandler implements IWriteStream, IReadStream {
  async writeAsync(data: ReadStream, path: string) {
    const writeStream = createWriteStream(path);
    await pipelineAsync(data, writeStream);
  }

  async readAsync(path: string, data: WriteStream) {
    const readStream = createReadStream(path);
    await pipelineAsync(readStream, data);
  }
}
