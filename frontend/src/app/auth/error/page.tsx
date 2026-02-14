'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sarabun } from 'next/font/google';

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

export default function AuthErrorPage() {
	const searchParams = useSearchParams();
	const error = searchParams.get('error');

	const getErrorMessage = (error: string | null) => {
		switch (error) {
			case 'Configuration':
				return 'There is a problem with the server configuration.';
			case 'AccessDenied':
				return 'Access denied. You do not have permission to sign in.';
			case 'Verification':
				return 'The verification token has expired or has already been used.';
			case 'OAuthSignin':
				return 'Error in constructing an authorization URL.';
			case 'OAuthCallback':
				return 'Error in handling the response from an OAuth provider.';
			case 'OAuthCreateAccount':
				return 'Could not create OAuth provider user in the database.';
			case 'EmailCreateAccount':
				return 'Could not create email provider user in the database.';
			case 'Callback':
				return 'Error in the OAuth callback handler route.';
			case 'OAuthAccountNotLinked':
				return 'Email already exists with a different sign-in method.';
			case 'SessionRequired':
				return 'Please sign in to access this page.';
			default:
				return 'An unknown error occurred during authentication.';
		}
	};

	return (
		<main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 py-12">
			<div className="w-full max-w-md">
				<Card className="border-t-4 border-t-red-500">
					<CardHeader className="space-y-4 text-center">
						<div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
							<svg
								className="w-10 h-10 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div className="space-y-2">
							<CardTitle className={`${sarabun.className} text-3xl text-red-600`}>
								เกิดข้อผิดพลาด
							</CardTitle>
							<CardDescription className="text-base">Authentication Error</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-800 text-center">{getErrorMessage(error)}</p>
						</div>
						<Link href="/auth/login" className="block">
							<Button
								variant="default"
								size="lg"
								className="w-full bg-[#006837] hover:bg-[#005530]"
							>
								Try Again
							</Button>
						</Link>
						<Link href="/" className="block">
							<Button variant="outline" size="lg" className="w-full">
								Go Home
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
