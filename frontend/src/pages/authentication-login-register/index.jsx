import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import GuestAccess from './components/GuestAccess';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const AuthenticationLoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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
    // Mock login validation
    const mockCredentials = {
      email: 'user@englishai.com',
      password: 'password123'
    };

    setTimeout(() => {
      if (credentials.email === mockCredentials.email && credentials.password === mockCredentials.password) {
        navigate('/personalized-dashboard');
      } else {
        alert('Invalid credentials. Use: user@englishai.com / password123');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (userData) => {
    setIsLoading(true);
    // Mock registration
    setTimeout(() => {
      navigate('/personalized-dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/personalized-dashboard');
      setIsLoading(false);
    }, 1000);
  };

  const handleGuestAccess = () => {
    navigate('/personalized-dashboard');
  };

  return (
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
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome to EnglishAI Chat
            </h1>
            <p className="text-text-secondary">
              Your AI-powered English learning companion
            </p>
          </div>

          {/* Main Auth Card */}
          <div className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              <button
                onClick={() => handleTabSwitch('login')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'login' ?'text-primary bg-primary-50 border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleTabSwitch('register')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'register' ?'text-primary bg-primary-50 border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  onForgotPassword={handleForgotPassword}
                  isLoading={isLoading}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                />
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
              <button className="text-primary hover:text-primary-600 transition-colors duration-200">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary-600 transition-colors duration-200">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={handleCloseForgotPassword} />
      )}
    </div>
  );
};

export default AuthenticationLoginRegister;