import { Pool } from 'pg';
import { getDbConnection } from '../database/pg.database';

export interface FileMetadata {
	id: string;
	filename: string;
	originalName: string;
	mimetype: string;
	size: number;
	path: string;
	uploadedBy: string;
	downloads: number;
	createdAt: Date;
	updatedAt: Date;
}

export const createFile = async (
	filename: string,
	originalName: string,
	mimetype: string,
	size: number,
	path: string,
	uploadedBy: string
): Promise<FileMetadata> => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        INSERT INTO files (id, filename, "originalName", mimetype, size, path, "uploadedBy", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING *;
    `;

	const values = [filename, originalName, mimetype, size, path, uploadedBy];
	const result = await pool.query(queryText, values);
	return result.rows[0];
};

export const getAllFiles = async (): Promise<FileMetadata[]> => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        SELECT f.*, u.name as "uploaderName", u.email as "uploaderEmail"
        FROM files f
        LEFT JOIN users u ON f."uploadedBy" = u.id
        ORDER BY f."createdAt" DESC;
    `;
	const result = await pool.query(queryText);
	return result.rows;
};

export const getFileById = async (id: string): Promise<FileMetadata | null> => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        SELECT f.*, u.name as "uploaderName", u.email as "uploaderEmail"
        FROM files f
        LEFT JOIN users u ON f."uploadedBy" = u.id
        WHERE f.id = $1;
    `;

	const values = [id];
	const result = await pool.query(queryText, values);
	return result.rows[0] || null;
};

export const incrementDownloadCount = async (id: string): Promise<void> => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        UPDATE files
        SET downloads = downloads + 1,
            "updatedAt" = NOW()
        WHERE id = $1;
    `;

	const values = [id];
	await pool.query(queryText, values);
};

export const deleteFile = async (id: string): Promise<FileMetadata | null> => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        DELETE FROM files
        WHERE id = $1
        RETURNING *;
    `;

	const values = [id];
	const result = await pool.query(queryText, values);
	return result.rows[0] || null;
};

export const getFilesByUser = async (
	userId: string
): Promise<FileMetadata[]> => {
	const pool: Pool = await getDbConnection();
	const queryText = `
        SELECT *
        FROM files
        WHERE "uploadedBy" = $1
        ORDER BY "createdAt" DESC;
    `;

	const values = [userId];
	const result = await pool.query(queryText);
	return result.rows;
};
