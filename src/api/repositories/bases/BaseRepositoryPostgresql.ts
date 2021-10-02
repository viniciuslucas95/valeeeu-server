import { DatabaseConnection } from '../../dataTypes/types';

export abstract class BaseRepositoryPostgresql {
  constructor(protected readonly connection: DatabaseConnection) {}
}
