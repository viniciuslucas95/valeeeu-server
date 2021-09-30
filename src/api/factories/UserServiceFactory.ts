import { PoolProvider } from '../providers';
import { UserRepositoryPostgresql } from '../repositories/userRepository';
import { UserService } from '../services';
import { DatabaseConnection } from '../dataTypes/types';

export class UserServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new UserRepositoryPostgresql(connection);
    return new UserService(repository);
  }
}
