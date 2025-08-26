import React from 'react';
import Icon from '../../../components/AppIcon';

const GuestAccess = ({ onGuestAccess }) => {
  return (
    <div className="mt-6">
      <div className="text-center">
        <button
          onClick={onGuestAccess}
          className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-transparent rounded-lg hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium"
        >
          <Icon name="Users" size={20} className="mr-2" />
          Continue as Guest
        </button>
        <p className="mt-2 text-sm text-text-secondary">
          Explore EnglishAI Chat without creating an account
        </p>
      </div>
    </div>
  );
};

export default GuestAccess;