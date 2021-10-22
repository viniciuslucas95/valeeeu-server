import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ProfileRatingRepositoryPostgresql } from '../../repositories/profile-repositories';
import { ProfileRatingService } from '../../services/profile-services';

export class ProfileRatingServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ProfileRatingRepositoryPostgresql(connection);
    return new ProfileRatingService(repository);
  }
}
