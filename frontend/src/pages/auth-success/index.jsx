import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Icon from 'components/AppIcon';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      
      // You might want to fetch user data here with the token
      // For now, we'll just redirect to dashboard
      toast.success('Authentication successful! Welcome to EnglishAI Chat!');
      navigate('/personalized-dashboard');
    } else {
      toast.error('Authentication failed. Please try again.');
      navigate('/authentication-login-register');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Completing Authentication...</h2>
        <p className="text-text-secondary">Please wait while we set up your account.</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;