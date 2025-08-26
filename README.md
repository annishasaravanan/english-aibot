# EnglishAI Chat - Authentication System

A complete authentication system with MVC backend structure for the EnglishAI Chat application.

## Features

### Authentication
- ✅ User Registration with email validation
- ✅ User Login with JWT tokens
- ✅ Google OAuth integration
- ✅ LinkedIn OAuth integration
- ✅ Guest access
- ✅ Forgot password functionality
- ✅ Password reset via email
- ✅ Form validation and error handling
- ✅ Toast notifications for user feedback

### Backend (MVC Structure)
- **Models**: User model with MongoDB/Mongoose
- **Views**: JSON API responses
- **Controllers**: Authentication logic
- **Routes**: RESTful API endpoints
- **Middleware**: JWT authentication, error handling
- **Utils**: Email service, password hashing

### Frontend
- React components for login/register forms
- Social authentication buttons
- Guest access option
- Responsive design with Tailwind CSS
- Form validation and loading states

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Gmail account for email service (optional)
- Google Cloud Console project for OAuth (optional)
- LinkedIn Developer account for OAuth (optional)

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Update the `.env` file with your credentials:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:3000
   SESSION_SECRET=your-session-secret
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # LinkedIn OAuth (optional)
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   
   # Email Service (optional)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@englishaichat.com
   ```

3. **Start Backend Server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Frontend Development Server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| POST | `/guest` | Create guest session |
| POST | `/forgot-password` | Send password reset email |
| POST | `/reset-password` | Reset password with token |
| GET | `/me` | Get current user (protected) |
| GET | `/google` | Google OAuth login |
| GET | `/google/callback` | Google OAuth callback |
| GET | `/linkedin` | LinkedIn OAuth login |
| GET | `/linkedin/callback` | LinkedIn OAuth callback |

### Request/Response Examples

#### Register User
```javascript
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

// Response
{
  "success": true,
  "message": "Registration successful! Welcome to EnglishAI Chat!",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": false,
    "avatar": ""
  }
}
```

#### Login User
```javascript
// POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "message": "Login successful! Welcome back!",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": false,
    "avatar": ""
  }
}
```

## OAuth Setup (Optional)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Update `.env` with client ID and secret

### LinkedIn OAuth
1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Create a new app
3. Add OAuth 2.0 redirect URL: `http://localhost:5000/api/auth/linkedin/callback`
4. Update `.env` with client ID and secret

## Email Service Setup (Optional)

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Update `.env` with your email and app password

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required for non-OAuth users),
  googleId: String (for Google OAuth),
  linkedinId: String (for LinkedIn OAuth),
  avatar: String,
  isEmailVerified: Boolean,
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: String (enum: 'user', 'admin'),
  isGuest: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Session management for OAuth
- CORS protection
- Input validation and sanitization
- Rate limiting (can be added)
- Secure password reset tokens

## Testing the Application

1. **Start both servers** (backend on :5000, frontend on :3000)
2. **Test Registration**: Fill out the signup form
3. **Test Login**: Use the credentials to login
4. **Test Guest Access**: Click "Continue as Guest"
5. **Test Social Auth**: Click Google/LinkedIn buttons (requires OAuth setup)
6. **Test Forgot Password**: Click "Forgot Password" link

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure backend CORS is configured for frontend URL
2. **OAuth Redirect Issues**: Check redirect URIs in OAuth provider settings
3. **Email Not Sending**: Verify email credentials and app password
4. **Database Connection**: Check MongoDB URI and network access
5. **Token Issues**: Verify JWT secret consistency

### Debug Mode
Set `NODE_ENV=development` in `.env` for detailed error messages.

## Next Steps

1. Add email verification flow
2. Implement refresh tokens
3. Add rate limiting
4. Add user profile management
5. Implement role-based access control
6. Add password strength requirements
7. Add account lockout after failed attempts
8. Implement social account linking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.