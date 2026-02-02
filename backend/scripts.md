# NPM Scripts Documentation

Complete reference for all npm scripts in the SKE-Schema backend project.

---

## Development Scripts

### `npm run dev`

```bash
ts-node-dev --respawn --transpile-only --exit-child --clear src/server.ts
```

Run the development server with hot-reload capabilities.

**Flags Explained:**

- `ts-node-dev` - TypeScript execution engine with auto-restart
- `--respawn` - Automatically restart the process when files change
- `--transpile-only` - Skip type checking during transpilation for faster compilation
- `--exit-child` - Kill the child process when restarting to prevent zombie processes
- `--clear` - Clear the console on each restart for cleaner output
- `src/server.ts` - Entry point file

**When to use:** During active development when you want automatic restarts on file changes.

---

## Build & Production Scripts

### `npm run build`

```bash
tsc --build --verbose
```

Compile TypeScript to JavaScript for production.

**Flags Explained:**

- `tsc` - TypeScript compiler
- `--build` - Incremental build mode, only rebuilds changed files (faster)
- `--verbose` - Show detailed compilation output

**When to use:** Before deploying to production or testing the build locally.

---

### `npm start`

```bash
node dist/server.js
```

Run the compiled production build.

**Flags Explained:**

- `node` - Native Node.js runtime (not TypeScript)
- `dist/server.js` - Compiled JavaScript output from the build step

**When to use:** After running `npm run build`, in production or for testing the build.

---

### `npm run start:prod`

```bash
NODE_ENV=production node dist/server.js
```

Run the production build with environment explicitly set to production.

**Flags Explained:**

- `NODE_ENV=production` - Sets environment variable to production
- Enables production optimizations (error handling, logging levels, etc.)

**When to use:** In production environments or when testing production-specific behavior.

---

## Code Quality Scripts

### `npm run lint`

```bash
eslint . --ext .ts --max-warnings 0
```

Lint all TypeScript files with **strict** mode (fails on any warnings).

**Flags Explained:**

- `eslint` - JavaScript/TypeScript linter
- `.` - Check all files in current directory recursively
- `--ext .ts` - Only check files with `.ts` extension
- `--max-warnings 0` - **Strict mode**: Fail if ANY warnings exist

**When to use:** Before committing code, in CI/CD pipelines, or to enforce code quality.

---

### `npm run lint:fix`

```bash
eslint . --ext .ts --fix
```

Automatically fix linting issues where possible.

**Flags Explained:**

- `--fix` - Automatically fix fixable issues (formatting, simple violations)

**When to use:** To quickly fix auto-fixable linting errors before manual review.

---

### `npm run format`

```bash
prettier --write "src/**/*.ts"
```

Format all TypeScript files using Prettier.

**Flags Explained:**

- `prettier` - Code formatter
- `--write` - Modify files in-place (overwrites with formatted code)
- `"src/**/*.ts"` - Glob pattern: all `.ts` files in `src` directory and subdirectories

**When to use:** Before committing to ensure consistent code formatting.

---

### `npm run format:check`

```bash
prettier --check "src/**/*.ts"
```

Verify formatting without modifying files.

**Flags Explained:**

- `--check` - Only verify formatting, don't modify files
- Exits with error code if files are not formatted correctly

**When to use:** In CI/CD pipelines to enforce formatting standards.

---

### `npm run type-check`

```bash
tsc --noEmit
```

Type-check TypeScript code without generating output files.

**Flags Explained:**

- `tsc` - TypeScript compiler
- `--noEmit` - Only check types, don't generate JavaScript files

**When to use:** For fast type checking in CI/CD or pre-commit hooks without full build.

---

## Testing Scripts

### `npm test`

```bash
jest --runInBand --detectOpenHandles --coverage
```

Run all tests with coverage reporting.

**Flags Explained:**

- `jest` - Testing framework
- `--runInBand` - Run tests serially (one at a time) instead of parallel
    - **Critical for database tests** to avoid race conditions
- `--detectOpenHandles` - Detect async operations preventing Jest from exiting
    - Helps find unclosed database connections, timers, etc.
- `--coverage` - Generate code coverage report

**When to use:** Before committing, in CI/CD pipelines, or to measure test coverage.

---

### `npm run test:watch`

```bash
jest --watch
```

Run tests in watch mode for interactive development.

**Flags Explained:**

- `--watch` - Re-run tests when files change
- Interactive mode with filtering options

**When to use:** During test-driven development (TDD) or when writing new tests.

---

## Database Scripts (Prisma)

### `npm run db:push`

```bash
prisma db push
```

Sync Prisma schema to database **without creating migrations**.

**When to use:**

- ✅ Prototyping and rapid development
- ❌ **NOT for production** (use migrations instead)

---

### `npm run db:migrate`

```bash
prisma migrate deploy
```

Apply pending migrations in production.

**When to use:**

- ✅ Production deployments
- ✅ CI/CD pipelines
- ❌ Does not create new migrations (only applies existing ones)

---

### `npm run db:migrate:dev`

```bash
prisma migrate dev
```

Create and apply migrations in development.

**What it does:**

1. Creates a new migration based on schema changes
2. Applies it to the development database
3. Automatically runs `prisma generate`

**When to use:** After modifying the Prisma schema in development.

---

### `npm run db:generate`

```bash
prisma generate
```

Generate Prisma Client based on your schema.

**What it does:**

- Generates TypeScript types and client code
- Updates the Prisma Client API

**When to use:** After schema changes (usually automatic with `migrate dev`).

---

### `npm run db:studio`

```bash
prisma studio
```

Open Prisma Studio GUI for database browsing.

**What it does:**

- Starts a web interface at `http://localhost:5555`
- Browse and edit database data visually

**When to use:** When you need to view or modify database data manually.

---

## Utility Scripts

### `npm run clean`

```bash
rimraf dist
```

Delete the compiled output directory.

**Flags Explained:**

- `rimraf` - Cross-platform `rm -rf` (works on Windows/Mac/Linux)
- `dist` - The build output directory

**When to use:** Before a fresh build to ensure no stale files.

---

### `prebuild` (Automatic)

```bash
npm run clean
```

**Lifecycle Hook:** Runs automatically before `npm run build`.

**What it does:** Ensures clean build by removing old compiled files.

---

### `prepare` (Automatic)

```bash
prisma generate
```

**Lifecycle Hook:** Runs automatically after `npm install`.

**What it does:** Ensures Prisma Client is always generated when dependencies are installed.

---

## Quick Reference Table

| Script           | Purpose                    | Use Case                           |
| ---------------- | -------------------------- | ---------------------------------- |
| `dev`            | Development server         | Active development with hot-reload |
| `build`          | Compile TypeScript         | Prepare for production deployment  |
| `start`          | Run production build       | Production or local build testing  |
| `start:prod`     | Run with production env    | Production deployment              |
| `lint`           | Strict linting             | Pre-commit, CI/CD                  |
| `lint:fix`       | Auto-fix lint issues       | Quick fixes                        |
| `format`         | Format code                | Pre-commit                         |
| `format:check`   | Verify formatting          | CI/CD                              |
| `type-check`     | Type checking only         | Fast CI/CD type validation         |
| `test`           | Run all tests              | Pre-commit, CI/CD                  |
| `test:watch`     | Interactive testing        | TDD development                    |
| `db:push`        | Sync schema (no migration) | Prototyping                        |
| `db:migrate`     | Apply migrations           | Production deployment              |
| `db:migrate:dev` | Create & apply migrations  | Development                        |
| `db:generate`    | Generate Prisma Client     | After schema changes               |
| `db:studio`      | Database GUI               | Manual data inspection             |
| `clean`          | Remove build files         | Fresh builds                       |

---

## Command Flags Reference

| Flag                  | Command     | Meaning                       |
| --------------------- | ----------- | ----------------------------- |
| `--respawn`           | ts-node-dev | Restart on file change        |
| `--transpile-only`    | ts-node-dev | Skip type checking for speed  |
| `--exit-child`        | ts-node-dev | Kill child process on restart |
| `--clear`             | ts-node-dev | Clear console on restart      |
| `--build`             | tsc         | Incremental build mode        |
| `--verbose`           | tsc         | Show detailed output          |
| `--noEmit`            | tsc         | Type check without output     |
| `--ext .ts`           | eslint      | Target TypeScript files       |
| `--max-warnings 0`    | eslint      | Treat warnings as errors      |
| `--fix`               | eslint      | Auto-fix issues               |
| `--write`             | prettier    | Modify files in-place         |
| `--check`             | prettier    | Verify without modifying      |
| `--runInBand`         | jest        | Run tests serially            |
| `--detectOpenHandles` | jest        | Find async leaks              |
| `--coverage`          | jest        | Generate coverage report      |
| `--watch`             | jest        | Watch mode                    |

---

## Recommended Workflow

### Development

```bash
# Start development server
npm run dev

# In another terminal, run tests in watch mode
npm run test:watch
```

### Before Committing

```bash
# Format code
npm run format

# Run linting
npm run lint:fix

# Type check
npm run type-check

# Run all tests
npm test
```

### Production Deployment

```bash
# Clean old builds
npm run clean

# Build for production
npm run build

# Apply database migrations
npm run db:migrate

# Start production server
npm run start:prod
```

### Database Development

```bash
# After modifying schema.prisma
npm run db:migrate:dev

# To view data
npm run db:studio
```

---

## Dependencies Required

Make sure these dev dependencies are installed:

```bash
npm install -D rimraf
```

All other dependencies should already be in your `package.json`.
