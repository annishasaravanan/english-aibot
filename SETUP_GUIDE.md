# EnglishAI Chat - Complete Setup Guide

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)
```bash
# Run the development environment
start-dev.bat
```

### Option 2: Manual Setup
```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend  
cd frontend
npm install
npm start
```

## 📋 What's Been Configured

### ✅ Backend Setup
- **Server**: Express.js running on port 5000
- **Database**: MongoDB connection configured
- **Authentication**: Complete registration/login system
- **CORS**: Configured for frontend ports (3000, 4028)
- **API Endpoints**: All auth endpoints ready

### ✅ Frontend Setup
- **Server**: Vite dev server on port 4028
- **API Integration**: Centralized API configuration
- **Proxy**: Vite proxy for backend API calls
- **Toast Notifications**: React-toastify configured
- **Forms**: Complete registration/login forms

### ✅ Registration Flow
1. **Form Validation**: Client-side validation
2. **API Call**: Secure API communication
3. **Backend Processing**: User creation in database
4. **Success Response**: JWT token + user data
5. **Toast Message**: Success notification
6. **Auto Login**: Automatic authentication
7. **Redirect**: Navigate to dashboard

## 🔧 Configuration Files

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://annisha2372003:annisha23@cluster0.vcefq33.mongodb.net/englishaichat
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### API Configuration
- **File**: `frontend/src/config/api.js`
- **Features**: Axios instance, interceptors, error handling
- **Endpoints**: All auth endpoints configured

## 🧪 Testing the Registration

### 1. Start Both Servers
```bash
# Use the batch file
start-dev.bat

# Or manually start both servers
```

### 2. Test Connection
```bash
# Run the connection test
node test-connection.js
```

### 3. Manual Testing
1. Open `http://localhost:4028`
2. Click "Sign Up" tab
3. Fill the form:
   - **Name**: Your full name
   - **Email**: Valid email address
   - **Password**: At least 6 characters
   - **Confirm Password**: Must match
4. Click "Create Account"
5. Watch for:
   - ✅ Success toast message
   - ✅ Automatic redirect to dashboard
   - ✅ User data stored in localStorage

## 📡 API Endpoints

### Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Response
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

## 🔍 Troubleshooting

### Backend Issues
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check MongoDB connection
# Ensure MongoDB URI is correct in .env
```

### Frontend Issues
```bash
# Check if frontend is running
curl http://localhost:4028

# Check API configuration
# Verify VITE_API_URL in .env
```

### Registration Issues
1. **Form validation errors**: Check required fields
2. **Network errors**: Verify backend is running
3. **CORS errors**: Check browser console
4. **Database errors**: Check MongoDB connection

## 🎯 Success Indicators

When everything works correctly:

1. ✅ **Backend Health**: `GET /api/health` returns success
2. ✅ **Frontend Access**: `http://localhost:4028` loads
3. ✅ **Form Submission**: No client-side errors
4. ✅ **API Communication**: Network tab shows successful requests
5. ✅ **Database Storage**: User created in MongoDB
6. ✅ **Toast Message**: Success notification appears
7. ✅ **Authentication**: JWT token stored
8. ✅ **Navigation**: Redirected to dashboard

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication
- **Input Validation**: Client and server-side
- **CORS Protection**: Restricted origins
- **Error Handling**: Secure error messages

## 📱 Frontend Features

- **Responsive Design**: Mobile-friendly forms
- **Real-time Validation**: Instant feedback
- **Loading States**: User feedback during requests
- **Error Handling**: Clear error messages
- **Success Feedback**: Toast notifications
- **Auto-redirect**: Seamless user experience

## 🗄️ Database Schema

```javascript
User {
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  isEmailVerified: Boolean,
  avatar: String,
  role: String,
  isGuest: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Next Steps

After successful registration setup:

1. **Email Verification**: Implement email verification flow
2. **Password Reset**: Complete forgot password functionality  
3. **Social Auth**: Configure Google/LinkedIn OAuth
4. **User Dashboard**: Build personalized dashboard
5. **Profile Management**: User profile editing
6. **Security**: Add rate limiting and additional security

## 📞 Support

If you encounter issues:

1. **Check Logs**: Backend and frontend console logs
2. **Run Tests**: Use `node test-connection.js`
3. **Verify Config**: Check all .env files
4. **Database**: Ensure MongoDB is accessible
5. **Ports**: Ensure ports 5000 and 4028 are available

The registration system is now fully connected and ready for use! 🎉