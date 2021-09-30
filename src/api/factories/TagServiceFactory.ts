import { DatabaseConnection } from '../dataTypes/types';
import { PoolProvider } from '../providers';
import { TagRepositoryPostgresql } from '../repositories/tagRepository';
import { TagService } from '../services';

export class TagServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new TagRepositoryPostgresql(connection);
    return new TagService(repository);
  }
}
