import 'dotenv/config';

export const env = {
	port: Number(process.env.PORT || 8000),
	jwtSecret: process.env.JWT_SECRET || '',
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
	dbPort: Number(process.env.SQL_PORT || 1433),

	smtpUser: process.env.SMTP_USER || '',
	smtpPass: process.env.SMTP_PASS || '',
	n8nHost: process.env.N8N_HOST || 'http://localhost:5678',

	nodeEnv: process.env.nodeEnv,
	corsOrigin: process.env.corsOrigin,
};
