import { DatabaseConnection } from '../data-types/types';

export abstract class BaseRepositoryPostgresql {
  constructor(
    protected readonly connection: DatabaseConnection,
    protected readonly tableName: string
  ) {}

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await this.connection.query(query, [id]);
  }

  async checkExistenceAsync(id: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }
}
