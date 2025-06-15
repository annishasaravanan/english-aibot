import React from 'react';
import Icon from 'components/AppIcon';

const GuestAccess = ({ onGuestAccess }) => {
  const guestFeatures = [
    'Limited AI conversations',
    'Basic vocabulary exercises',
    'No progress tracking',
    'No personalized recommendations'
  ];

  return (
    <div className="mt-6 p-4 bg-surface-50 border border-border rounded-lg">
      <div className="text-center mb-3">
        <h3 className="text-sm font-medium text-text-primary mb-2">
          Try as Guest
        </h3>
        <p className="text-xs text-text-secondary mb-3">
          Explore EnglishAI Chat with limited features
        </p>
      </div>

      {/* Feature List */}
      <div className="mb-4">
        <ul className="space-y-1">
          {guestFeatures.map((feature, index) => (
            <li key={index} className="flex items-center text-xs text-text-secondary">
              <Icon 
                name={index < 2 ? "Check" : "X"} 
                size={12} 
                className={`mr-2 ${index < 2 ? 'text-accent' : 'text-error'}`}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onGuestAccess}
        className="w-full bg-surface border border-border text-text-primary py-2 px-4 rounded-lg text-sm font-medium hover:bg-surface-100 hover:border-primary-200 transition-all duration-200 ease-gentle flex items-center justify-center"
      >
        <Icon name="UserCheck" size={16} className="mr-2" />
        Continue as Guest
      </button>
    </div>
  );
};

export default GuestAccess;