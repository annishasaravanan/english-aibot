import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import GuestAccess from './components/GuestAccess';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import RegistrationSuccessModal from './components/RegistrationSuccessModal';
import { authAPI, socialAuthURLs } from '../../config/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthenticationLoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success(response.data.message || 'Login successful! Welcome back!');
        navigate('/personalized-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (userData) => {
    setIsLoading(true);
    try {
      console.log('Registering user with data:', userData);
      const response = await authAPI.register(userData);
      
      if (response.data.msg) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Store registration data for the modal
        setRegistrationData({
          emailVerificationStatus: 'pending', // Assuming email verification is pending
          userEmail: userData.email,
          message: response.data.msg
        });
        
        // Show success modal
        setShowRegistrationSuccess(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseRegistrationSuccess = () => {
    setShowRegistrationSuccess(false);
    setRegistrationData(null);
    navigate('/personalized-dashboard');
  };
  
  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    try {
      // For social auth, we redirect to the backend OAuth routes
      if (provider === 'google') {
        window.location.href = socialAuthURLs.google;
      } else if (provider === 'linkedin') {
        window.location.href = socialAuthURLs.linkedin;
      }
    } catch (error) {
      console.error('Social auth error:', error);
      toast.error('Social authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGuestAccess = async () => {
    try {
      const response = await authAPI.guestAccess();
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success(response.data.message || 'Guest access granted! Explore EnglishAI Chat!');
        navigate('/personalized-dashboard');
      }
    } catch (error) {
      console.error('Guest access error:', error);
      toast.error('Guest access failed. Please try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 pt-16">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent-100 rounded-full opacity-15 animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
          <div className="w-full max-w-md">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" size={32} color="white" strokeWidth={2} />
              </div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome to EnglishAI Chat</h1>
              <p className="text-text-secondary">Your AI-powered English learning companion</p>
            </div>

            {/* Main Auth Card */}
            <div className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => handleTabSwitch('login')}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                    activeTab === 'login' ? 'text-primary bg-primary-50 border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleTabSwitch('register')}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                    activeTab === 'register' ? 'text-primary bg-primary-50 border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {activeTab === 'login' ? (
                  <LoginForm onSubmit={handleLogin} onForgotPassword={handleForgotPassword} isLoading={isLoading} />
                ) : (
                  <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
                )}

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="px-4 text-sm text-text-secondary">or</span>
                  <div className="flex-1 border-t border-border"></div>
                </div>

                {/* Social Authentication */}
                <SocialAuth onSocialAuth={handleSocialAuth} isLoading={isLoading} />
              </div>
            </div>

            {/* Guest Access */}
            <GuestAccess onGuestAccess={handleGuestAccess} />

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-text-secondary">
              <p>
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary-600 transition-colors duration-200">Terms of Service</button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary-600 transition-colors duration-200">Privacy Policy</button>
              </p>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotPassword && <ForgotPasswordModal onClose={handleCloseForgotPassword} />}
        
        {/* Registration Success Modal */}
        {showRegistrationSuccess && (
          <RegistrationSuccessModal
            isOpen={showRegistrationSuccess}
            onClose={handleCloseRegistrationSuccess}
            emailVerificationStatus={registrationData?.emailVerificationStatus}
            userEmail={registrationData?.userEmail}
          />
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AuthenticationLoginRegister;
