import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import userRouter from './routes/user.route';

// Initialize Express app
const app: Express = express();
const PORT = env.port;

/**
 * Configure middleware
 */
function configureMiddleware(app: Express): void {
	// Trust proxy for rate limiting and security
	app.set('trust proxy', 1);

	// Security headers
	app.use(
		helmet({
			crossOriginResourcePolicy: { policy: 'cross-origin' },
		})
	);

	// CORS configuration
	app.use(
		cors({
			origin: env.corsOrigin || 'http://localhost:3000',
			credentials: true,
		})
	);

	// Body parsing
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Cookie parser
	app.use(cookieParser());

	// Logging
	app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
}

/**
 * Configure rate limiting
 */
function configureRateLimit(): express.RequestHandler {
	return rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // Limit each IP to 100 requests per windowMs
		standardHeaders: 'draft-7',
		legacyHeaders: false,
		message:
			'Too many requests from this IP, please try again after 15 minutes',
	});
}

/**
 * Configure API routes
 */
function configureRoutes(app: Express): void {
	const apiV1Router = express.Router();
	const limiter = configureRateLimit();

	// Apply rate limiting to API routes
	apiV1Router.use(limiter);

	// routes

	apiV1Router.use('/user', userRouter)

	// Mount v1 API router
	app.use('/api/v1', apiV1Router);

	// Health check endpoint
	app.get('/health', (req, res) => {
		res.status(200).json({
			status: 'ok',
			timestamp: new Date().toISOString(),
		});
	});

	// 404 handler
	app.use((req, res) => {
		res.status(404).json({ error: 'Not Found' });
	});

	// Error handler
	app.use(
		(
			err: Error,
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			console.error('Error:', err);
			res.status(500).json({
				error:
					env.nodeEnv === 'production'
						? 'Internal Server Error'
						: err.message,
			});
		}
	);
}

/**
 * Start the server
 */
function startServer(): void {
	app.listen(PORT, () => {
		console.log(`🌐 Server running on http://localhost:${PORT}`);
		console.log(`📝 Environment: ${env.nodeEnv}`);
	});
}

// Initialize application
configureMiddleware(app);
configureRoutes(app);
startServer();
