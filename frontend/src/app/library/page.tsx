'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sarabun } from 'next/font/google';
import { Upload, Download, Search, Filter, MoreVertical, FileText, Trash2 } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';
import {
	getAllFiles,
	downloadFile,
	deleteFile as deleteFileService,
	formatFileSize,
	getFileIcon,
	FileData,
} from '@/services/file.service';

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

export default function LibraryPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [files, setFiles] = useState<FileData[]>([]);
	const [loading, setLoading] = useState(true);
	const [showUpload, setShowUpload] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth/login');
		}
	}, [status, router]);

	useEffect(() => {
		if (status === 'authenticated') {
			loadFiles();
		}
	}, [status]);

	const loadFiles = async () => {
		setLoading(true);
		try {
			const data = await getAllFiles();
			setFiles(data);
		} catch (error) {
			console.error('Error loading files:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = async (id: string, filename: string) => {
		try {
			await downloadFile(id, filename);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this file?')) return;

		try {
			await deleteFileService(id);
			await loadFiles(); // Reload files after deletion
		} catch (error) {
			console.error('Error deleting file:', error);
			alert('Failed to delete file');
		}
	};

	const filteredFiles = files.filter((file) =>
		file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const totalSize = files.reduce((sum, file) => sum + file.size, 0);

	if (status === 'loading') {
		return (
			<div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-[#006837] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		return null;
	}

	return (
		<main className="min-h-[calc(100vh-180px)] p-6">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className={`${sarabun.className} text-3xl font-bold text-[#006837]`}>
							คลังไฟล์เรียน
						</h1>
						<p className="text-muted-foreground mt-1">Share and access study materials</p>
					</div>
					<Button
						onClick={() => setShowUpload(!showUpload)}
						className="bg-[#006837] hover:bg-[#005530] gap-2"
					>
						<Upload className="w-4 h-4" />
						{showUpload ? 'Hide Upload' : 'Upload File'}
					</Button>
				</div>

				{/* Upload Section */}
				{showUpload && (
					<FileUpload
						onUploadComplete={() => {
							loadFiles();
							setShowUpload(false);
						}}
					/>
				)}

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Total Files
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">{files.length}</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Total Downloads
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">
								{files.reduce((sum, file) => sum + file.downloads, 0)}
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Your Uploads
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">
								{files.filter((f) => f.uploadedBy === session?.userId).length}
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Storage Used
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">{formatFileSize(totalSize)}</p>
						</CardContent>
					</Card>
				</div>

				{/* Search Bar */}
				<Card>
					<CardContent className="pt-6">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1 relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
								<Input
									placeholder="Search files..."
									className="pl-10"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" className="gap-2">
									<Filter className="w-4 h-4" />
									Filter
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Files List */}
				<Card>
					<CardHeader>
						<CardTitle>Files</CardTitle>
						<CardDescription>{filteredFiles.length} files available</CardDescription>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div className="text-center py-12">
								<div className="w-12 h-12 border-4 border-[#006837] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
								<p className="text-muted-foreground">Loading files...</p>
							</div>
						) : filteredFiles.length === 0 ? (
							<div className="text-center py-12">
								<FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
								<p className="text-muted-foreground">
									{searchQuery ? 'No files found' : 'No files uploaded yet'}
								</p>
							</div>
						) : (
							<div className="space-y-2">
								{filteredFiles.map((file) => (
									<div
										key={file.id}
										className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
									>
										<div className="flex items-center gap-4 flex-1">
											<div className="text-3xl">{getFileIcon(file.mimetype)}</div>
											<div className="flex-1">
												<p className="font-medium">{file.originalName}</p>
												<p className="text-sm text-muted-foreground">
													{formatFileSize(file.size)} • Uploaded by {file.uploaderName || 'Unknown'}{' '}
													• {new Date(file.createdAt).toLocaleDateString()}
												</p>
											</div>
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<Download className="w-4 h-4" />
												<span>{file.downloads}</span>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Button
												size="sm"
												variant="outline"
												className="gap-2"
												onClick={() => handleDownload(file.id, file.originalName)}
											>
												<Download className="w-4 h-4" />
												Download
											</Button>
											{file.uploadedBy === session?.userId && (
												<Button
													size="sm"
													variant="ghost"
													onClick={() => handleDelete(file.id)}
													className="text-red-600 hover:text-red-700 hover:bg-red-50"
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
