'use client';

import type { Metadata } from 'next';
import { Inter, Sarabun } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { SessionProvider } from 'next-auth/react';
import { Header } from '@/components/Header';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
});

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

// export const metadata: Metadata = {
// 	title: 'SKE Schema - แหล่งแบ่งปันความรู้และไฟล์เรียน',
// 	description: 'Knowledge Sharing Platform for SKE Students - Kasetsart University',
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="th">
			<body
				className={`${inter.variable} ${sarabun.variable} antialiased min-h-screen flex flex-col`}
			>
				<SessionProvider>
					<Providers>
						<Header />

						<div className="flex-1 bg-linear-to-br from-emerald-50 to-amber-50">{children}</div>

						<footer className="bg-[#006837] text-white py-6">
							<div className={`max-w-6xl mx-auto px-6 text-center ${sarabun.variable}`}>
								<p className="font-sarabun">คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์</p>
								<p className="text-emerald-200 text-sm mt-1">
									Faculty of Engineering, Kasetsart University
								</p>
							</div>
						</footer>
					</Providers>
				</SessionProvider>
			</body>
		</html>
	);
}
