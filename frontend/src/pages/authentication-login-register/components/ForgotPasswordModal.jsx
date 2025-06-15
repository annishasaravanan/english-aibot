import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setError('');

    // Mock password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-surface rounded-2xl shadow-xl border border-border w-full max-w-md animation-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">
            Reset Password
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <p className="text-text-secondary text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Icon 
                      name="Mail" 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                    />
                    <input
                      type="email"
                      id="reset-email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none ${
                        error
                          ? 'border-error bg-error-light focus:border-error focus:ring-2 focus:ring-error-light' :'border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary-100'
                      }`}
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-error flex items-center">
                      <Icon name="AlertCircle" size={14} className="mr-1" />
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 ease-gentle disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} className="mr-2" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Check Your Email
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 ease-gentle"
              >
                Got it, thanks!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;