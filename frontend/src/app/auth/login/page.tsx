'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sarabun } from 'next/font/google';

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

export default function SignInPage() {
	const handleGoogleSignIn = async () => {
		await signIn('google', { callbackUrl: '/' });
	};

	return (
		<main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 py-12">
			<div className="w-full max-w-md">
				<Card className="border-t-4 border-t-[#006837]">
					<CardHeader className="space-y-4 text-center">
						<div className="w-20 h-20 bg-[#006837] rounded-full flex items-center justify-center mx-auto">
							<span className="text-white font-bold text-3xl">SKE</span>
						</div>
						<div className="space-y-2">
							<CardTitle className={`${sarabun.className} text-3xl text-[#006837]`}>
								เข้าสู่ระบบ
							</CardTitle>
							<CardDescription className="text-base">
								Sign in to SKE Schema with your Google account
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button
							onClick={handleGoogleSignIn}
							variant="outline"
							size="lg"
							className="w-full text-base font-semibold"
						>
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Sign in with Google
						</Button>
						<p className={`${sarabun.className} text-center text-sm text-muted-foreground pt-2`}>
							สำหรับนักศึกษา SKE มหาวิทยาลัยเกษตรศาสตร์
						</p>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
