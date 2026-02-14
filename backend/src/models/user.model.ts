import { getDbConnection } from '../database/pg.database';
import { Pool } from 'pg';

export const createUser = async (
	id: string,
	email: string,
	name: string | null
) => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        INSERT INTO users (id, email, name)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

	const values = [id, email, name];
	const result = await pool.query(queryText, values);
	return result.rows[0];
};

export const updateUser = async (
	id: string,
	email: string,
	name: string | null
) => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        UPDATE users
        SET 
            email = $2, 
            name = $3
        WHERE id = $1
        RETURNING *;
    `;

	const values = [id, email, name];
	const result = await pool.query(queryText, values);
	return result.rows[0];
};

export const deleteUser = async (id: string) => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
    `;

	const values = [id];
	const result = await pool.query(queryText, values);
	return result.rows[0];
};

export const getUserById = async (id: string) => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        SELECT * FROM users
        WHERE id = $1;
    `;

	const values = [id];
	const result = await pool.query(queryText, values);
	return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        SELECT * FROM users
        WHERE email = $1;
    `;

	const values = [email];
	const result = await pool.query(queryText, values);
	return result.rows[0];
};

export const getAllUsers = async () => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        SELECT * FROM users
        ORDER BY email ASC;
    `;
	const result = await pool.query(queryText);
	return result.rows;
};
