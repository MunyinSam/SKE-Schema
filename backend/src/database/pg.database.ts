import { Pool } from 'pg';
import '../config/env';

const pool = new Pool({
	user: process.env.POSTGRES_USER ?? '',
	password: process.env.POSTGRES_PASSWORD ?? '',
	host: process.env.POSTGRES_HOST ?? 'localhost',
	database: process.env.POSTGRES_DB ?? '',
	port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
});

export const getDbConnection = async () => pool;
