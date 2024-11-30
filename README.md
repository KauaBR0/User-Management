# Hono + Drizzle ORM Full Stack Application

A modern full-stack application built with Hono.js and Drizzle ORM using PostgreSQL.

## Features

- REST API using Hono.js
- PostgreSQL database with Drizzle ORM
- TypeScript support
- User and Post management
- CORS enabled
- Request logging

## Prerequisites

- Node.js
- PostgreSQL
- pnpm/npm/yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
create an `.env` and update the values:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
PORT=3000
```

3. Initialize the database:
```bash
npm run db:generate
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Users
- GET /users - List all users
- POST /users - Create a new user
- GET /users/:id - Get a specific user

### Posts
- GET /posts - List all posts
- POST /posts - Create a new post
- GET /posts/:id - Get a specific post

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

### Frontend
```
cd frontend
npm install
npm run dev
```

## License

MIT
