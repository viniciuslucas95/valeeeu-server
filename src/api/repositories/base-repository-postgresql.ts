import { DatabaseConnection } from '../data-types/types';

export abstract class BaseRepositoryPostgresql {
  constructor(
    protected readonly connection: DatabaseConnection,
    protected readonly tableName: string
  ) {}
}
