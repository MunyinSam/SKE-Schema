'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sarabun } from 'next/font/google';
import { Users, MessageSquare, Calendar, BookOpen } from 'lucide-react';

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

export default function CommunityPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth/login');
		}
	}, [status, router]);

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
				<div className="text-center">
					<h1 className={`${sarabun.className} text-3xl font-bold text-[#006837]`}>ชุมชน SKE</h1>
					<p className="text-muted-foreground mt-1">Connect and collaborate with fellow students</p>
				</div>

				{/* Coming Soon Message */}
				<Card className="border-t-4 border-t-[#006837]">
					<CardHeader>
						<div className="flex items-center justify-center mb-4">
							<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
								<Users className="w-10 h-10 text-[#006837]" />
							</div>
						</div>
						<CardTitle className="text-center text-2xl">Coming Soon!</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-center text-muted-foreground mb-6">
							We're building an amazing community space for SKE students. Stay tuned!
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="text-center p-4 bg-accent rounded-lg">
								<MessageSquare className="w-8 h-8 text-[#006837] mx-auto mb-2" />
								<p className="font-medium">Discussion Forums</p>
								<p className="text-sm text-muted-foreground">Ask questions and share ideas</p>
							</div>
							<div className="text-center p-4 bg-accent rounded-lg">
								<Calendar className="w-8 h-8 text-[#006837] mx-auto mb-2" />
								<p className="font-medium">Events</p>
								<p className="text-sm text-muted-foreground">Join workshops and meetups</p>
							</div>
							<div className="text-center p-4 bg-accent rounded-lg">
								<BookOpen className="w-8 h-8 text-[#006837] mx-auto mb-2" />
								<p className="font-medium">Study Groups</p>
								<p className="text-sm text-muted-foreground">Collaborate on projects</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
