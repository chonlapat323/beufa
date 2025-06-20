# UFABET369 Backend API

This project is a backend API for a simplified wallet service, built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and PostgreSQL. It features user authentication with JWT, and transaction functionalities including deposit, withdrawal, and history tracking.

## Features

- User Authentication (Login/Logout) with JWT.
- Secure password hashing using `bcrypt`.
- Deposit and Withdrawal functionality with transactional safety.
- Transaction history for each user.
- Database interaction via Prisma ORM.
- Dockerized environment with PostgreSQL and pgAdmin.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or newer recommended)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/)

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root of the project and add the following content:

```env
# PostgreSQL connection URL
DATABASE_URL="postgresql://admin:password@localhost:5432/ufabet369?schema=public"

# JWT secret key for signing tokens
JWT_SECRET=yourSuperSecretKeyForJWT
```

### 3. Start the Database Environment

Run the following command to start the PostgreSQL database and pgAdmin containers.

```bash
docker-compose up -d
```

- PostgreSQL will be available on `localhost:5432`.
- pgAdmin will be available at `http://localhost:8080`.

### 4. Apply Database Schema and Seed Data

This command will set up the database schema and add a default test user (`testuser` with password `password123`).

```bash
npx prisma migrate dev
```

```bash
npx prisma db seed
```

### 5. Run the Application

```bash
# Run in development watch mode
npm run start:dev
```

- ✅ The application will be running on **`http://localhost:5000`**.

---

## ⚙️ API Endpoints

The base URL for the API is `http://localhost:5000`.

### Authentication

| Method | Endpoint        | Description                                    |
| :----- | :-------------- | :--------------------------------------------- |
| `POST` | `/auth/login`   | Logs in a user and returns a JWT access token. |
| `POST` | `/auth/logout`  | Logs out the user (for client-side cleanup).   |
| `GET`  | `/auth/profile` | Returns the profile of the logged-in user.     |

### Transactions

| Method | Endpoint                 | Description                                  |
| :----- | :----------------------- | :------------------------------------------- |
| `POST` | `/transactions/deposit`  | Deposits an amount into the user's account.  |
| `POST` | `/transactions/withdraw` | Withdraws an amount from the user's account. |
| `GET`  | `/transactions/history`  | Retrieves transaction history for the user.  |
