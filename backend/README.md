# Motivation AI Backend

This is the backend server for the Motivation AI application. It provides APIs for user authentication and motivation generation based on user mood and profile.

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Middleware functions
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── validation/     # Validation schemas
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── .env                # Environment variables
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change user password
- `POST /api/auth/refresh-token` - Refresh authentication token

### Motivation

- `GET /api/motivate/:mood` - Get motivation based on mood
- `GET /api/motivate/personalized/:mood` - Get personalized motivation based on user profile and mood

### Health Check

- `GET /api/health` - Check if the server is running

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file with the following variables:

   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   GPT_API_KEY=your_openai_api_key
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

3. Start the server:

   ```
   npm start
   ```

   For development with auto-reload:

   ```
   npm run dev
   ```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. When a user logs in or signs up, a token is generated and returned to the client. This token should be included in the `Authorization` header of subsequent requests or stored as an HTTP-only cookie.

## Database

The application uses MySQL as the database. The database schema includes a `users2` table with the following fields:

- id
- firstname
- lastname
- email
- password (hashed)
- about
- bigDream
- inspiration
- obstacles
- fears
- regrets
