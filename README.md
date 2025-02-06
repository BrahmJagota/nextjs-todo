# Task Management App

A simple task management app built with Next.js, Prisma, MongoDB Atlas, and Clerk authentication.

## Features
- Add, update, and delete tasks
- Mark tasks as completed
- User authentication with Clerk

## Setup

### 1. Clone the Repository
```sh
git clone https://github.com/BrahmJagota/nextjs-todo.git
```
### 2. Install Dependencies and Setup Prisma
using pnpm 
```sh
pnpm install
pnpm prisma generate
```

Or using npm:
```sh
npm install
npx prisma generate
```

### 3. Configure Environment Variables
Create a .env file in the root directory and add:
```env
DATABASE_URL="your_mongodb_atlas_uri"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

### 4. Run the Development Server
Using pnpm:
```sh
pnpm dev
```

Or using npm:
```sh
npm run dev
```

Your app will be running at http://localhost:3000.
 