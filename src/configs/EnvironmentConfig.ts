import dotenv from 'dotenv';

dotenv.config();

export class EnvironmentConfig {
  private static readonly env = process.env;
  static readonly serverPort = this.env.SERVER_PORT ?? '';
  static readonly postgresqlUser = this.env.POSTGRESQL_USER ?? '';
  static readonly postgresqlPassword = this.env.POSTGRESQL_PASSWORD ?? '';
  static readonly postgresqlDatabase = this.env.POSTGRESQL_DATABASE ?? '';
  static readonly accessTokenSecret = this.env.ACCESS_TOKEN_SECRET ?? '';
  static readonly refreshTokenSecret = this.env.REFRESH_TOKEN_SECRET ?? '';
}
