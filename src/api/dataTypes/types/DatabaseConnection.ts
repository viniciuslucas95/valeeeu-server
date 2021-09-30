import { Pool, PoolClient } from 'pg';

export type DatabaseConnection = PoolClient | Pool;
