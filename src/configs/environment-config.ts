import dotenv from 'dotenv';

dotenv.config();

export class EnvironmentConfig {
  private static readonly env = process.env;
  static readonly serverPort = this.env.SERVER_PORT ?? 3000;
  static readonly postgresqlUser = this.env.POSTGRESQL_USER ?? 'test';
  static readonly postgresqlPassword = this.env.POSTGRESQL_PASSWORD ?? 'test';
  static readonly postgresqlDatabase = this.env.POSTGRESQL_DATABASE ?? 'test';
  static readonly postgresqlHost =
    this.env.POSTGRESQL_HOST ?? 'valeeeu_dev_postgresql';
  static readonly accessTokenSecret = this.env.ACCESS_TOKEN_SECRET ?? '123456';
  static readonly refreshTokenSecret =
    this.env.REFRESH_TOKEN_SECRET ?? '987654';
}
