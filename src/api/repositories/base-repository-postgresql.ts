import { DatabaseConnection } from '../data-types/types';

export class BaseRepositoryPostgresql {
  constructor(
    protected readonly connection: DatabaseConnection,
    protected readonly tableName: string
  ) {}
}
