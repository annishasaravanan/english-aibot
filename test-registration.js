const axios = require('axios');

// Test registration functionality
async function testRegistration() {
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    confirmPassword: 'password123'
  };

  try {
    console.log('Testing registration with:', testUser);
    
    const response = await axios.post('http://localhost:5000/api/auth/register', testUser);
    
    console.log('✅ Registration successful!');
    console.log('Response:', response.data);
    console.log('Token received:', response.data.token ? 'Yes' : 'No');
    console.log('User data:', response.data.user);
    
  } catch (error) {
    console.log('❌ Registration failed:');
    console.log('Error:', error.response?.data || error.message);
  }
}

// Test login functionality
async function testLogin() {
  const credentials = {
    email: 'test@example.com',
    password: 'password123'
  };

  try {
    console.log('\nTesting login with:', credentials);
    
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.log('❌ Login failed:');
    console.log('Error:', error.response?.data || error.message);
  }
}

// Test server health
async function testServerHealth() {
  try {
    console.log('Testing server health...');
    
    const response = await axios.get('http://localhost:5000/api/health');
    
    console.log('✅ Server is running!');
    console.log('Health check:', response.data);
    
    // Run registration test
    await testRegistration();
    
  } catch (error) {
    console.log('❌ Server is not running or not accessible');
    console.log('Error:', error.message);
    console.log('\nPlease make sure to:');
    console.log('1. Start the backend server: cd backend && npm start');
    console.log('2. Ensure MongoDB is connected');
    console.log('3. Check that port 5000 is available');
  }
}

testServerHealth();