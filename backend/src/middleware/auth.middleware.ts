import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request to include user data using module augmentation
declare module 'express-serve-static-core' {
	interface Request {
		user?: {
			id: string;
			email: string;
			name?: string;
		};
	}
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Get token from Authorization header
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({
				error: 'Unauthorized - No token provided',
			});
		}

		const token = authHeader.split(' ')[1];

		// Verify the token (NextAuth JWT)
		// NextAuth uses the NEXTAUTH_SECRET to sign tokens
		const secret = process.env.NEXTAUTH_SECRET;

		if (!secret) {
			console.error('NEXTAUTH_SECRET is not configured');
			return res.status(500).json({
				error: 'Server configuration error',
			});
		}

		// Decode and verify the JWT token
		const decoded = jwt.verify(token, secret) as {
			sub?: string;
			email?: string;
			name?: string;
		};

		if (!decoded.sub || !decoded.email) {
			return res.status(401).json({
				error: 'Unauthorized - Invalid token',
			});
		}

		// Attach user data to request
		req.user = {
			id: decoded.sub,
			email: decoded.email,
			name: decoded.name,
		};

		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				error: 'Unauthorized - Invalid token',
			});
		}
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				error: 'Unauthorized - Token expired',
			});
		}
		console.error('Auth middleware error:', error);
		return res.status(500).json({
			error: 'Internal server error',
		});
	}
};
