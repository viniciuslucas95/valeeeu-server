import { ClientConfig } from 'pg';
import { EnvironmentConfig } from './environment-config';

export class PostgresqlConfig {
  static readonly client: ClientConfig = {
    host: EnvironmentConfig.postgresqlHost,
    user: EnvironmentConfig.postgresqlUser,
    password: EnvironmentConfig.postgresqlPassword,
    database: EnvironmentConfig.postgresqlDatabase,
  };
}
