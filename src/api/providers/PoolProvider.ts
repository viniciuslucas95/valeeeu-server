import { Pool } from 'pg';
import { PostgresqlConfig } from '../../configs';

export class PoolProvider {
  public static readonly pool = new Pool(PostgresqlConfig.client);
}
