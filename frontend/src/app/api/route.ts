import { createUser, getUserByEmail } from '@/services/user.service';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface CustomSession extends Session {
	backendToken?: string;
	userId?: string;
}

interface CustomJWT extends JWT {
	backendToken?: string;
	userId?: string;
}

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === 'google' && user.email) {
				try {
					const existingUser = await getUserByEmail(user.email);

					if (!existingUser) {
						const payload = {
							id: user.id || profile?.sub || '',
							email: user.email,
							name: user.name || null,
						};

						await createUser(payload);
					}
					return true;
				} catch (error) {
					console.error('Error during sign in:', error);
					return false;
				}
			}
			return true;
		},
		async jwt({ token, user, account }) {
			// Initial sign in - generate a JWT for backend auth and fetch userId
			if (account && user && user.email) {
				const dbUser = await getUserByEmail(user.email);
				const userId = dbUser?.id || user.id || token.sub;

				const secret = process.env.NEXTAUTH_SECRET!;
				const backendToken = jwt.sign(
					{
						sub: userId,
						email: user.email,
						name: user.name,
					},
					secret,
					{ expiresIn: '7d' }
				);
				return {
					...token,
					backendToken,
					userId,
				};
			}
			return token;
		},
		async session({ session, token }) {
			// Send backend token and userId to client
			if (session.user) {
				session.backendToken =
					typeof token.backendToken === 'string'
						? token.backendToken
						: undefined;
				session.userId =
					typeof token.userId === 'string' ? token.userId : undefined;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
