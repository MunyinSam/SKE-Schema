import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

async function customMiddleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/api/proxy/')) {
		const backendUrl = process.env.BACKEND_URL;
		if (!backendUrl) {
			console.error('Error: BACKEND_URL environment variable is not set.');
			return new NextResponse('Internal Server Error: Proxy not configured.', {
				status: 500,
			});
		}

		const token = await getToken({ req: request });

		const path = request.nextUrl.pathname.replace('/api/proxy', '/api/v1');

		const newUrl = new URL(path, backendUrl);
		request.nextUrl.searchParams.forEach((value, key) => {
			newUrl.searchParams.append(key, value);
		});

		const headers = new Headers(request.headers);
		if (token?.accessToken) {
			headers.set('Authorization', `Bearer ${token.accessToken}`);
		}

		return NextResponse.rewrite(newUrl, {
			request: {
				headers,
			},
		});
	}

	return NextResponse.next();
}

export default withAuth(customMiddleware, {
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		authorized({ req, token }) {
			const { pathname } = req.nextUrl;

			// Allow proxy routes
			if (pathname.startsWith('/api/proxy/')) {
				return true;
			}

			// Allow static files
			if (pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|webp|css|js)$/)) {
				return true;
			}

			// Protect library, finance, community pages
			if (
				pathname.startsWith('/library') ||
				pathname.startsWith('/finance') ||
				pathname.startsWith('/community')
			) {
				return !!token;
			}

			return true;
		},
	},
});

export const config = {
	matcher: ['/api/proxy/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
