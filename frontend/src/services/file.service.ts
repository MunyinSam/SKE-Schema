import axios from 'axios';

const getServerInstance = () => {
	return axios.create({
		baseURL: '/api/proxy/files',
	});
};

export interface FileData {
	id: string;
	filename: string;
	originalName: string;
	mimetype: string;
	size: number;
	path: string;
	uploadedBy: string;
	uploaderName?: string;
	uploaderEmail?: string;
	downloads: number;
	createdAt: string;
	updatedAt: string;
}

export interface UploadProgress {
	loaded: number;
	total: number;
	percentage: number;
}

// Upload file with progress tracking
export const uploadFile = async (
	file: File,
	onProgress?: (progress: UploadProgress) => void
): Promise<FileData> => {
	const serverInstance = getServerInstance();
	const formData = new FormData();
	formData.append('file', file);

	const response = await serverInstance.post('', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		onUploadProgress: (progressEvent) => {
			if (onProgress && progressEvent.total) {
				const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				onProgress({
					loaded: progressEvent.loaded,
					total: progressEvent.total,
					percentage,
				});
			}
		},
	});

	return response.data.file;
};

// Get all files
export const getAllFiles = async (): Promise<FileData[]> => {
	const serverInstance = getServerInstance();
	const response = await serverInstance.get('');
	return response.data;
};

// Get file by ID
export const getFileById = async (id: string): Promise<FileData> => {
	const serverInstance = getServerInstance();
	const response = await serverInstance.get(`/${id}`);
	return response.data;
};

// Download file
export const downloadFile = async (id: string, filename: string): Promise<void> => {
	const serverInstance = getServerInstance();
	const response = await serverInstance.get(`/${id}/download`, {
		responseType: 'blob',
	});

	// Create download link
	const url = window.URL.createObjectURL(new Blob([response.data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', filename);
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.URL.revokeObjectURL(url);
};

// Delete file
export const deleteFile = async (id: string): Promise<void> => {
	const serverInstance = getServerInstance();
	await serverInstance.delete(`/${id}`);
};

// Format file size
export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Get file icon based on mimetype
export const getFileIcon = (mimetype: string): string => {
	if (mimetype.startsWith('image/')) return '🖼️';
	if (mimetype.startsWith('video/')) return '🎥';
	if (mimetype.startsWith('audio/')) return '🎵';
	if (mimetype.includes('pdf')) return '📄';
	if (mimetype.includes('word') || mimetype.includes('document')) return '📝';
	if (mimetype.includes('excel') || mimetype.includes('spreadsheet')) return '📊';
	if (mimetype.includes('powerpoint') || mimetype.includes('presentation')) return '📊';
	if (mimetype.includes('zip') || mimetype.includes('compressed')) return '🗜️';
	if (mimetype.includes('text')) return '📃';
	return '📎';
};
