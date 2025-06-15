import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/personalized-dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
            <Icon name="Search" size={48} className="text-primary-400" />
          </div>
          <div className="text-6xl font-bold text-primary-300 mb-2">404</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-text-secondary leading-relaxed">
            The page you're looking for seems to have wandered off. 
            Let's get you back to learning English with EnglishAI Chat!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 ease-gentle flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-surface border border-border text-text-primary py-3 px-6 rounded-lg font-medium hover:bg-surface-100 transition-all duration-200 ease-gentle flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-text-secondary mb-3">Need help? Try these:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => navigate('/ai-chat-interface')}
              className="text-primary hover:text-primary-600 transition-colors duration-200"
            >
              AI Chat
            </button>
            <button
              onClick={() => navigate('/vocabulary-learning-hub')}
              className="text-primary hover:text-primary-600 transition-colors duration-200"
            >
              Vocabulary Hub
            </button>
            <button
              onClick={() => navigate('/grammar-correction-tool')}
              className="text-primary hover:text-primary-600 transition-colors duration-200"
            >
              Grammar Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;