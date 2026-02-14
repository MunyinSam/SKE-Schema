import type { Metadata } from 'next';
import { Inter, Sarabun } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

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

export const metadata: Metadata = {
	title: 'SKE Schema - แหล่งแบ่งปันความรู้และไฟล์เรียน',
	description: 'Knowledge Sharing Platform for SKE Students - Kasetsart University',
};

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
				<header className="bg-[#006837] text-white py-4 px-6 shadow-lg">
					<div className="max-w-6xl mx-auto flex items-center justify-between">
						<Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
							<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
								<span className="text-[#006837] font-bold text-xl">SKE</span>
							</div>
							<div>
								<h1 className="font-semibold text-lg">SKE Schema</h1>
								<p className="text-sm text-emerald-100">Software and Knowledge Engineering</p>
							</div>
						</Link>
					</div>
				</header>

				<div className="flex-1 bg-linear-to-br from-emerald-50 to-amber-50">{children}</div>

				<footer className="bg-[#006837] text-white py-6">
					<div className={`max-w-6xl mx-auto px-6 text-center ${sarabun.variable}`}>
						<p className="font-sarabun">คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์</p>
						<p className="text-emerald-200 text-sm mt-1">
							Faculty of Engineering, Kasetsart University
						</p>
					</div>
				</footer>
			</body>
		</html>
	);
}
