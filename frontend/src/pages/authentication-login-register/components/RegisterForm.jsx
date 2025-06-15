import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    englishLevel: 'beginner',
    learningGoals: []
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const englishLevels = [
    { value: 'beginner', label: 'Beginner (A1-A2)' },
    { value: 'intermediate', label: 'Intermediate (B1-B2)' },
    { value: 'advanced', label: 'Advanced (C1-C2)' }
  ];

  const learningGoalOptions = [
    'Business Communication',
    'Academic Writing',
    'Conversation Skills',
    'Grammar Improvement',
    'Vocabulary Building',
    'Exam Preparation'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter(g => g !== goal)
        : [...prev.learningGoals, goal]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <div className="relative">
          <Icon 
            name="User" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none ${
              errors.name
                ? 'border-error bg-error-light focus:border-error focus:ring-2 focus:ring-error-light' :'border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary-100'
            }`}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-text-primary mb-2">
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
            id="register-email"
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
        <label htmlFor="register-password" className="block text-sm font-medium text-text-primary mb-2">
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
            id="register-password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 focus:outline-none ${
              errors.password
                ? 'border-error bg-error-light focus:border-error focus:ring-2 focus:ring-error-light' :'border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary-100'
            }`}
            placeholder="Create a password"
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

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Icon 
            name="Lock" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 focus:outline-none ${
              errors.confirmPassword
                ? 'border-error bg-error-light focus:border-error focus:ring-2 focus:ring-error-light' :'border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary-100'
            }`}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* English Level */}
      <div>
        <label htmlFor="englishLevel" className="block text-sm font-medium text-text-primary mb-2">
          Current English Level
        </label>
        <select
          id="englishLevel"
          name="englishLevel"
          value={formData.englishLevel}
          onChange={handleInputChange}
          className="w-full px-3 py-3 border border-border bg-surface rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200 focus:outline-none"
          disabled={isLoading}
        >
          {englishLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Learning Goals */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Learning Goals (Optional)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {learningGoalOptions.map(goal => (
            <button
              key={goal}
              type="button"
              onClick={() => handleGoalToggle(goal)}
              className={`p-2 text-xs rounded-lg border transition-all duration-200 ${
                formData.learningGoals.includes(goal)
                  ? 'bg-primary-50 border-primary text-primary-700' :'bg-surface border-border text-text-secondary hover:border-primary-200 hover:bg-primary-50'
              }`}
              disabled={isLoading}
            >
              {goal}
            </button>
          ))}
        </div>
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
            Creating Account...
          </>
        ) : (
          <>
            <Icon name="UserPlus" size={18} className="mr-2" />
            Create Account
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;