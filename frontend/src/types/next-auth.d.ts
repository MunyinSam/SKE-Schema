import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		backendToken?: string;
		userId?: string;
		user: {
			id: string;
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		email: string;
		name?: string | null;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		backendToken?: string;
		userId?: string;
	}
}
