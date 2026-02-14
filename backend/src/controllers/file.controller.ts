import { Request, Response } from 'express';
import {
	createFile,
	getAllFiles,
	getFileById,
	incrementDownloadCount,
	deleteFile as deleteFileModel,
} from '../models/file.model';
import fs from 'fs';
import path from 'path';

// Upload file controller
export const uploadFileController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		if (!req.file) {
			res.status(400).json({ error: 'No file uploaded' });
			return;
		}

		// Get user ID from auth middleware
		const userId = req.user?.id;
		if (!userId) {
			// Delete uploaded file if user not authenticated
			fs.unlinkSync(req.file.path);
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		// Save file metadata to database
		const fileMetadata = await createFile(
			req.file.filename,
			req.file.originalname,
			req.file.mimetype,
			req.file.size,
			req.file.path,
			userId
		);

		res.status(201).json({
			message: 'File uploaded successfully',
			file: fileMetadata,
		});
	} catch (error) {
		console.error('Error uploading file:', error);
		// Delete uploaded file if database save fails
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ error: 'Failed to upload file' });
	}
};

// Get all files controller
export const getAllFilesController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const files = await getAllFiles();
		res.status(200).json(files);
	} catch (error) {
		console.error('Error fetching files:', error);
		res.status(500).json({ error: 'Failed to fetch files' });
	}
};

// Get file by ID controller
export const getFileByIdController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const id = req.params.id as string;
		const file = await getFileById(id);

		if (!file) {
			res.status(404).json({ error: 'File not found' });
			return;
		}

		res.status(200).json(file);
	} catch (error) {
		console.error('Error fetching file:', error);
		res.status(500).json({ error: 'Failed to fetch file' });
	}
};

// Download file controller
export const downloadFileController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		console.log('Download request received for ID:', req.params.id);
		console.log('Authorization header:', req.headers.authorization);

		const id = req.params.id as string;
		const file = await getFileById(id);

		if (!file) {
			console.error('File not found in database:', id);
			res.status(404).json({ error: 'File not found' });
			return;
		}

		console.log('File found:', {
			id: file.id,
			path: file.path,
			originalName: file.originalName,
		});

		// Check if file exists on disk
		if (!fs.existsSync(file.path)) {
			console.error(`File not found on disk: ${file.path}`);
			res.status(404).json({ error: 'File not found on server' });
			return;
		}

		// Increment download count
		await incrementDownloadCount(id);

		// Set headers for file download
		res.setHeader('Content-Type', file.mimetype);
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="${encodeURIComponent(file.originalName)}"`
		);
		res.setHeader('Content-Length', file.size.toString());

		// Stream file to client with error handling
		const fileStream = fs.createReadStream(file.path);

		fileStream.on('error', (streamError) => {
			console.error('File stream error:', streamError);
			if (!res.headersSent) {
				res.status(500).json({ error: 'Failed to read file' });
			}
		});

		fileStream.pipe(res);
	} catch (error) {
		console.error('Error downloading file:', error);
		if (!res.headersSent) {
			res.status(500).json({ error: 'Failed to download file' });
		}
	}
};

// Delete file controller
export const deleteFileController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const id = req.params.id as string;
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		// Get file to check ownership
		const file = await getFileById(id);

		if (!file) {
			res.status(404).json({ error: 'File not found' });
			return;
		}

		// Check if user owns the file
		if (file.uploadedBy !== userId) {
			res.status(403).json({
				error: 'You do not have permission to delete this file',
			});
			return;
		}

		// Delete file from database
		const deletedFile = await deleteFileModel(id);

		// Delete file from disk
		if (fs.existsSync(file.path)) {
			fs.unlinkSync(file.path);
		}

		res.status(200).json({
			message: 'File deleted successfully',
			file: deletedFile,
		});
	} catch (error) {
		console.error('Error deleting file:', error);
		res.status(500).json({ error: 'Failed to delete file' });
	}
};
