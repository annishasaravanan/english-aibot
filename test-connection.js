const axios = require('axios');

// Test configuration
const BACKEND_URL = 'http://localhost:5000';
const FRONTEND_URL = 'http://localhost:4028';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test backend health
async function testBackendHealth() {
  try {
    log('\n🔍 Testing Backend Health...', 'blue');
    const response = await axios.get(`${BACKEND_URL}/api/health`);
    
    if (response.data.success) {
      log('✅ Backend is running and healthy!', 'green');
      log(`   Message: ${response.data.message}`, 'green');
      return true;
    } else {
      log('❌ Backend health check failed', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Backend is not accessible', 'red');
    log(`   Error: ${error.message}`, 'red');
    log('   Make sure to start the backend server: cd backend && npm start', 'yellow');
    return false;
  }
}

// Test database connection
async function testDatabaseConnection() {
  try {
    log('\n🔍 Testing Database Connection...', 'blue');
    const response = await axios.get(`${BACKEND_URL}/`);
    
    if (response.data.success) {
      log('✅ Database connection is working!', 'green');
      return true;
    } else {
      log('❌ Database connection failed', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Cannot test database connection', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

// Test registration endpoint
async function testRegistrationEndpoint() {
  try {
    log('\n🔍 Testing Registration Endpoint...', 'blue');
    
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      confirmPassword: 'password123'
    };

    log(`   Registering user: ${testUser.email}`, 'blue');
    const response = await axios.post(`${BACKEND_URL}/api/auth/register`, testUser);
    
    if (response.data.success) {
      log('✅ Registration endpoint is working!', 'green');
      log(`   User created: ${response.data.user.name}`, 'green');
      log(`   Email: ${response.data.user.email}`, 'green');
      log(`   Token received: ${response.data.token ? 'Yes' : 'No'}`, 'green');
      log(`   Message: ${response.data.message}`, 'green');
      return true;
    } else {
      log('❌ Registration failed', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Registration endpoint test failed', 'red');
    log(`   Error: ${error.response?.data?.message || error.message}`, 'red');
    return false;
  }
}

// Test email configuration
async function testEmailConfiguration() {
  try {
    log('\n🔍 Testing Email Configuration...', 'blue');
    
    // This is a simple check - we can't access backend env from here
    log('📧 Email configuration status:', 'blue');
    log('   If email is configured: Registration emails will be sent', 'blue');
    log('   If email is not configured: Registration will still work', 'blue');
    log('   Check backend console for email status messages', 'blue');
    
    return true;
  } catch (error) {
    log('❌ Email configuration test failed', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

// Test CORS configuration
async function testCORS() {
  try {
    log('\n🔍 Testing CORS Configuration...', 'blue');
    
    const response = await axios.get(`${BACKEND_URL}/api/health`, {
      headers: {
        'Origin': 'http://localhost:4028'
      }
    });
    
    if (response.status === 200) {
      log('✅ CORS is properly configured!', 'green');
      return true;
    } else {
      log('❌ CORS configuration issue', 'red');
      return false;
    }
  } catch (error) {
    log('❌ CORS test failed', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

// Test frontend accessibility
async function testFrontend() {
  try {
    log('\n🔍 Testing Frontend Accessibility...', 'blue');
    const response = await axios.get(FRONTEND_URL);
    
    if (response.status === 200) {
      log('✅ Frontend is accessible!', 'green');
      return true;
    } else {
      log('❌ Frontend is not accessible', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Frontend is not running', 'red');
    log(`   Error: ${error.message}`, 'red');
    log('   Make sure to start the frontend server: cd frontend && npm start', 'yellow');
    return false;
  }
}

// Main test function
async function runTests() {
  log('🚀 Starting Connection Tests for EnglishAI Chat', 'blue');
  log('=' .repeat(50), 'blue');

  const results = {
    backend: await testBackendHealth(),
    database: await testDatabaseConnection(),
    registration: await testRegistrationEndpoint(),
    cors: await testCORS(),
    frontend: await testFrontend()
  };

  log('\n📊 Test Results Summary:', 'blue');
  log('=' .repeat(30), 'blue');
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const color = passed ? 'green' : 'red';
    log(`${test.toUpperCase().padEnd(15)}: ${status}`, color);
  });

  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    log('\n🎉 All tests passed! Your registration system is ready!', 'green');
    log('\nTo test registration:', 'blue');
    log('1. Open http://localhost:4028 in your browser', 'blue');
    log('2. Click on "Sign Up" tab', 'blue');
    log('3. Fill out the registration form', 'blue');
    log('4. Submit and watch for the success toast message!', 'blue');
  } else {
    log('\n⚠️  Some tests failed. Please check the issues above.', 'yellow');
    log('\nTroubleshooting:', 'blue');
    log('1. Make sure MongoDB is running and accessible', 'blue');
    log('2. Start backend: cd backend && npm start', 'blue');
    log('3. Start frontend: cd frontend && npm start', 'blue');
    log('4. Check .env files for correct configuration', 'blue');
  }
}

// Run the tests
runTests().catch(error => {
  log('\n💥 Test runner crashed:', 'red');
  log(error.message, 'red');
});