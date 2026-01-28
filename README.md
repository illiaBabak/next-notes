# 📝 Next Notes

> A full-stack notes application built with Next.js 16 for learning modern React and server-side rendering patterns

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

## 🎯 Project Goal

This project was built as a **learning pet project** with the main purpose to:

- **Learn Next.js 16** with the App Router architecture and server components
- **Explore Server Actions** for form handling and data mutations
- **Implement JWT authentication** with secure HTTP-only cookies

## 📸 Project Preview

![Auth](https://docs.google.com/uc?id=130b4aafGc1H6BBUZPSjI057PT5Uq09Q-)
<i>Auth</i>

![View](https://docs.google.com/uc?id=1_CA8M-M_-lnydso7JKpVIiy6IkFBCsnn)
<i>Main page</i>

## 🚀 Tech Stack

### Core Technologies

- **Next.js 16**
- **React 19**
- **TypeScript**
- **MongoDB**
- **Tailwind CSS 4**

### Additional Tools

- **TanStack Query (React Query)** — server state management with optimistic updates
- **Motion** — smooth animations for note cards and color picker
- **bcryptjs** — secure password hashing
- **jsonwebtoken (JWT)** — token-based authentication

### Testing

- **Cypress** — end-to-end testing framework for comprehensive test coverage

## ✨ Features

### 🔐 Authentication System

- **User Registration** with password confirmation and validation
- **User Login** with JWT-based session management
- **Secure HTTP-only cookies** for storing session tokens
- **Protected routes** with server-side authentication checks
- **Password hashing** using bcrypt

### 📒 Notes Management

- **Create notes** with color selection (5 color options)
- **Edit notes** — change text and color
- **Delete notes** with confirmation
- **Search notes** by text content via URL query params
- **Optimistic updates** — instant UI feedback before server response

## 📁 Project Structure

```text
app/
├── (auth)/                    # Auth route group
│   ├── layout.tsx             # Auth layout with background
│   ├── login/
│   │   ├── page.tsx           # Login form component
│   │   └── actions.ts         # Server action for login
│   └── register/
│       ├── page.tsx           # Registration form
│       └── actions.ts         # Server action for registration
├── (home)/                    # Home route group
│   ├── page.tsx               # Main notes page
│   └── components/
│       ├── NoteModal/         # Note editing modal
│       ├── NotesList/         # Notes grid display
│       ├── Search/            # Search input component
│       └── SideBar/           # Sidebar with user info and color picker
├── api/
│   └── notes/                 # REST API routes
│       ├── route.ts           # GET all notes, POST new note
│       └── [id]/route.ts      # PATCH and DELETE note by ID
├── globals.scss               # Global styles
└── layout.tsx                 # Root layout with providers

lib/
├── mongo.ts                   # MongoDB connection helper
├── notes/                     # Note database operations
│   ├── createNote.ts
│   ├── deleteNote.ts
│   ├── editNote.ts
│   └── getNotes.ts
└── users/                     # User database operations
    ├── createUser.ts
    └── loginUser.ts

services/
├── notes/
│   ├── queries.ts             # React Query hooks for fetching
│   └── mutations.ts           # React Query hooks for mutations
└── queryKeys.ts               # Query key constants

contexts/
├── notesUI.tsx                # UI state for note creation animation
└── reactQuery.tsx             # React Query provider

cypress/
├── e2e/
│   ├── auth.cy.ts             # Authentication tests
│   └── notes.cy.ts            # Notes CRUD and search tests
└── support/
    └── commands.ts            # Custom Cypress commands
```

## 🛠 Setup and Scripts

### Prerequisites

- Node.js (recommended **v20+**)
- **pnpm** (or npm/yarn)
- MongoDB Atlas account or local MongoDB instance

### Install dependencies

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB connection string
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app>"

# Database names
MONGODB_NAME_PROD="next-notes"
MONGODB_NAME_TEST="next-notes-test"

# JWT secret for signing tokens (use a strong random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Environment: "production" or "test"
APP_ENV="production"
```

| Variable            | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| `MONGODB_URI`       | MongoDB Atlas connection string or local MongoDB URI                          |
| `MONGODB_NAME_PROD` | Database name for production environment                                      |
| `MONGODB_NAME_TEST` | Database name for running Cypress tests (separate DB to avoid data conflicts) |
| `JWT_SECRET`        | Secret key for signing JWT tokens (keep this secure!)                         |
| `APP_ENV`           | Set to `"test"` when running Cypress tests, `"production"` otherwise          |

### Start development server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Build for production

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

### Linting

```bash
pnpm lint
```

## 🧪 Testing

The project uses **Cypress** for end-to-end testing. Test coverage includes:

### Authentication Tests (`auth.cy.ts`)

- User registration with validation
- Duplicate username handling
- Password mismatch errors
- Login with valid/invalid credentials
- Session cookie verification
- Navigation between auth pages

### Notes CRUD Tests (`notes.cy.ts`)

- Create notes with different colors
- Edit note text and color
- Delete notes
- Empty state handling

### Search Tests (`notes.cy.ts`)

- Filter notes by search query
- Clear search to show all notes
- No results message

### Running Tests

1. **Set environment for testing:**

```bash
# In .env file, set:
APP_ENV="test"
```

2. **Start the development server:**

```bash
pnpm dev
```

3. **Run Cypress in interactive mode:**

```bash
npx cypress open
```

4. **Or run tests in headless mode:**

```bash
npx cypress run
```

> **Important:** Tests use a separate database (`MONGODB_NAME_TEST`) which is cleared before each test suite using the `cy.task('clearDatabase')` command.

---
