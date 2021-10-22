import { PoolClient } from 'pg';

export class PostgresqlTransactionHandler {
  static async executeTransactionAsync(client: PoolClient, action: Function) {
    try {
      await client.query('BEGIN');
      await action();
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}
