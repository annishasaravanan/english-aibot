import React from 'react';
import Icon from 'components/AppIcon';

const SocialAuth = ({ onSocialAuth, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders.map(provider => (
        <button
          key={provider.name}
          onClick={() => onSocialAuth(provider.name.toLowerCase())}
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg font-medium transition-all duration-200 ease-gentle disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md ${
            provider.name === 'Google' ?'bg-surface text-text-primary hover:bg-surface-100 border-border' 
              : `${provider.color} ${provider.textColor}`
          }`}
        >
          <Icon 
            name={provider.icon} 
            size={18} 
            className={`mr-3 ${provider.name === 'Google' ? 'text-red-500' : 'text-white'}`}
          />
          Continue with {provider.name}
        </button>
      ))}
    </div>
  );
};

export default SocialAuth;