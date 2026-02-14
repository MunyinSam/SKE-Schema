# Database Setup Guide

This guide will help you set up the PostgreSQL database for SKE-Schema.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js and npm installed

## Step-by-Step Setup

### 1. Start PostgreSQL Database

The project uses Docker to run PostgreSQL. Start it with:

```bash
docker-compose up -d
```

This command:
- Starts PostgreSQL in the background
- Creates a database named `skeschema`
- Sets up username: `postgres`, password: `postgres`
- Runs on port `5432`

### 2. Verify Database is Running

Check if PostgreSQL is running:

```bash
docker-compose ps
```

You should see the `postgres` service with status "Up".

### 3. Create Database Tables

Navigate to the backend folder and run the Prisma migration:

```bash
cd backend
npm run db:push
```

This creates two tables:
- `users` - Stores user accounts
- `files` - Stores uploaded file metadata

### 4. Verify Tables Were Created

You can verify the tables using Prisma Studio:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555` where you can see your database tables.

Alternatively, you can connect to the database directly:

```bash
docker exec -it postgres psql -U postgres -d skeschema
```

Then run:
```sql
\dt
```

You should see a list showing `users` and `files` tables.

Type `\q` to exit.

## Troubleshooting

### Issue: "Connection refused" error

**Solution:** Make sure Docker is running and PostgreSQL container is up:
```bash
docker-compose up -d
docker-compose ps
```

### Issue: "relation does not exist" error

**Solution:** Tables haven't been created yet. Run:
```bash
cd backend
npm run db:push
```

### Issue: Port 5432 already in use

**Solution:** Another PostgreSQL instance is running. Either:
1. Stop the other PostgreSQL service, or
2. Change the port in `compose.yml` and `backend/.env`

### Reset Database

If you need to start fresh:

```bash
# Stop all containers
docker-compose down

# Delete database data
docker volume rm skeschema_postgres-data

# Start fresh
docker-compose up -d
cd backend
npm run db:push
```

## Environment Variables

The database connection is configured in `backend/.env`:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/skeschema
```

Format: `postgresql://[username]:[password]@[host]:[port]/[database]`

## Database Schema

### Users Table
- `id` - Unique user identifier
- `email` - User's email (unique)
- `name` - User's display name
- `role` - User role (optional)
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Files Table
- `id` - Unique file identifier
- `filename` - Stored filename (UUID)
- `originalName` - Original uploaded filename
- `mimetype` - File type (e.g., application/pdf)
- `size` - File size in bytes
- `path` - Full path to file on server
- `uploadedBy` - User ID who uploaded the file
- `downloads` - Download count
- `createdAt` - Upload timestamp
- `updatedAt` - Last update timestamp

## Quick Reference

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start database |
| `docker-compose down` | Stop database |
| `docker-compose ps` | Check database status |
| `npm run db:push` | Create/update tables |
| `npm run db:studio` | Open database GUI |
| `npm run db:migrate:dev` | Create a new migration |

## Next Steps

After setting up the database:

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Visit `http://localhost:3000` and log in with Google OAuth

4. Try uploading a file in the Library page!
