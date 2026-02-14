import { defineConfig } from '@prisma/client';
import '../src/config/env';

export default defineConfig({
	datasourceUrl: process.env.DATABASE_URL,
});
