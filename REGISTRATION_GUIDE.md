# User Registration System Guide

## Overview
The registration system is fully implemented and includes:
- ✅ Backend API endpoint for user registration
- ✅ Frontend registration form with validation
- ✅ Password hashing and security
- ✅ JWT token generation
- ✅ Toast notifications for success/error messages
- ✅ Automatic login after registration
- ✅ Data storage in MongoDB

## How It Works

### 1. Frontend Registration Flow
When a user fills out the registration form:

1. **Form Validation**: Client-side validation checks:
   - Name (minimum 2 characters)
   - Valid email format
   - Password (minimum 6 characters)
   - Password confirmation match

2. **API Call**: Form data is sent to `POST /api/auth/register`

3. **Success Handling**:
   - JWT token stored in localStorage
   - User data stored in localStorage
   - Success toast message displayed
   - Automatic redirect to dashboard

4. **Error Handling**:
   - Error toast message displayed
   - Form remains accessible for retry

### 2. Backend Registration Process

1. **Input Validation**:
   - Checks all required fields are present
   - Validates password length and confirmation match
   - Validates email format

2. **User Existence Check**:
   - Checks if email is already registered
   - Returns error if user exists

3. **User Creation**:
   - Hashes password using bcrypt
   - Creates new user in MongoDB
   - Generates email verification token

4. **Response**:
   - Returns JWT token for immediate login
   - Returns user data (without password)
   - Returns success message

## API Endpoint Details

### POST /api/auth/register

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! Welcome to EnglishAI Chat!",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": false,
    "avatar": ""
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

## Frontend Components

### RegisterForm Component
- Located: `frontend/src/pages/authentication-login-register/components/RegisterForm.jsx`
- Features:
  - Form validation
  - Password visibility toggle
  - Loading states
  - Error display

### Main Auth Page
- Located: `frontend/src/pages/authentication-login-register/index.jsx`
- Features:
  - Tab switching between login/register
  - API integration
  - Toast notifications
  - Navigation handling

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  isEmailVerified: Boolean (default: false),
  avatar: String,
  role: String (default: 'user'),
  isGuest: Boolean (default: false),
  lastLogin: Date,
  timestamps: true
}
```

## Security Features

1. **Password Hashing**: Uses bcrypt with salt rounds of 12
2. **JWT Tokens**: Secure token generation for authentication
3. **Input Validation**: Both client and server-side validation
4. **Email Verification**: Token-based email verification system
5. **CORS Protection**: Configured for frontend domain only

## How to Test Registration

### 1. Start the Backend Server
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Test Registration
1. Navigate to `http://localhost:3000`
2. Click on "Sign Up" tab
3. Fill out the registration form:
   - Full Name: Your name
   - Email: Valid email address
   - Password: At least 6 characters
   - Confirm Password: Must match password
4. Click "Create Account"
5. You should see:
   - Success toast message
   - Automatic redirect to dashboard
   - User logged in state

### 4. Verify in Database
Check MongoDB to confirm user was created with:
- Hashed password
- Correct user data
- Timestamps

## Troubleshooting

### Common Issues:

1. **"Registration failed" error**:
   - Check backend server is running
   - Verify MongoDB connection
   - Check console for detailed errors

2. **"User already exists" error**:
   - Email is already registered
   - Try with different email

3. **Validation errors**:
   - Ensure all fields are filled
   - Password must be 6+ characters
   - Passwords must match

4. **Network errors**:
   - Check backend server is running on port 5000
   - Verify CORS configuration
   - Check browser network tab for details

## Testing Script

Run the test script to verify registration:
```bash
node test-registration.js
```

This will test:
- Server connectivity
- Registration endpoint
- Response format
- Error handling

## Success Indicators

When registration works correctly, you should see:
1. ✅ Form submits without client-side errors
2. ✅ Backend receives and processes request
3. ✅ User created in MongoDB database
4. ✅ JWT token generated and returned
5. ✅ Success toast message displayed
6. ✅ User redirected to dashboard
7. ✅ User data stored in localStorage

The registration system is fully functional and ready for use!