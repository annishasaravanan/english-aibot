import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LoginForm = ({ onSubmit, onForgotPassword, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
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
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none ${
              errors.email
                ? 'border-error bg-error-light focus:border-error focus:ring-2 focus:ring-error-light' :'border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary-100'
            }`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Icon 
            name="Lock" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 focus:outline-none ${
              errors.password
                ? 'border-error bg-error-light focus:border-error focus:ring-2 focus:ring-error-light' :'border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary-100'
            }`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary-100 focus:ring-2"
            disabled={isLoading}
          />
          <span className="ml-2 text-sm text-text-secondary">Remember me</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-200"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 ease-gentle disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Signing In...
          </>
        ) : (
          <>
            <Icon name="LogIn" size={18} className="mr-2" />
            Sign In
          </>
        )}
      </button>

      {/* Mock Credentials Info */}
      <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
        <p className="text-xs text-primary-700 font-medium mb-1">Demo Credentials:</p>
        <p className="text-xs text-primary-600">Email: user@englishai.com</p>
        <p className="text-xs text-primary-600">Password: password123</p>
      </div>
    </form>
  );
};

export default LoginForm;