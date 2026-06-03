# TasksFlow

A full-stack task management app built with Next.js 16, TypeScript, and MongoDB.

🔗 **Live Demo:** https://tasksflow-three.vercel.app

## Features

- Authentication with Google OAuth and email/password via NextAuth.js
- Create, edit, and delete tasks
- Filter tasks by status (All, To Do, In Progress, Done)
- Protected routes — unauthenticated users are redirected to login
- Skeleton loading UI while tasks fetch
- Fully responsive layout

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js (Google + Credentials) |
| Deployment | Vercel + MongoDB Atlas |

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sadia-webdev/TasksFlow.git
cd TasksFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

---
### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

app/
├── api/
│   ├── auth/        # NextAuth route handler
│   └── models/      # Mongoose models (Task, User)
├── dashboard/       # Protected dashboard pages
│   ├── components/  # Sidebar, TaskList, TaskSkeleton, Menu
│   └── tasks/       # Tasks page + edit task page
├── form/            # Server actions (createTask, updateTask, deleteTask)
├── lib/             # Database connection
├── login/           # Login page
├── register/        # Register page
└── types/           # TypeScript types


---

## Deployment

Deployed on **Vercel** with **MongoDB Atlas** as the database.

To deploy your own:
1. Push to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Add your Vercel URL to Google OAuth authorized redirect URIs

## Author

Built by [Sadia](https://github.com/sadia-webdev)