import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads/files');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure disk storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadsDir);
	},
	filename: (req, file, cb) => {
		// Generate unique filename: uuid-timestamp-originalname
		const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	},
});

// File filter - only allow certain file types
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	// Allowed file types
	const allowedMimes = [
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.ms-powerpoint',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/zip',
		'application/x-zip-compressed',
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/webp',
		'text/plain',
	];

	if (allowedMimes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type. Only PDF, Word, Excel, PowerPoint, ZIP, and images are allowed.'));
	}
};

// Configure multer
export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 50 * 1024 * 1024, // 50MB max file size
	},
	fileFilter: fileFilter,
});

// Export uploads directory path
export const UPLOADS_DIR = uploadsDir;
