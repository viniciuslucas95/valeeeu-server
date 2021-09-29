import { ClientConfig } from 'pg';
import { EnvironmentConfig } from './EnvironmentConfig';

export class PostgresqlConfig {
  static readonly client: ClientConfig = {
    host: 'valeeeu_dev_postgresql',
    user: EnvironmentConfig.postgresqlUser,
    password: EnvironmentConfig.postgresqlPassword,
    database: EnvironmentConfig.postgresqlDatabase,
  };
}
