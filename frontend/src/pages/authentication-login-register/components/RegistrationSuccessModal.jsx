import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationSuccessModal = ({ isOpen, onClose, emailVerificationStatus, userEmail }) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (emailVerificationStatus) {
      case 'sent':
        return {
          icon: 'Mail',
          iconColor: 'text-green-600',
          iconBg: 'bg-green-100',
          title: 'Registration Successful!',
          message: 'Welcome to EnglishAI Chat! We\'ve sent a verification email to your inbox.',
          details: `Please check your email at ${userEmail} and click the verification link to complete your account setup.`,
          actionText: 'Continue to Dashboard',
          showEmailNote: true
        };
      case 'failed':
        return {
          icon: 'AlertTriangle',
          iconColor: 'text-orange-600',
          iconBg: 'bg-orange-100',
          title: 'Registration Successful!',
          message: 'Your account has been created successfully.',
          details: 'We couldn\'t send the verification email due to a technical issue, but you can still use all features of EnglishAI Chat.',
          actionText: 'Continue to Dashboard',
          showEmailNote: false
        };
      case 'skipped':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
          title: 'Registration Successful!',
          message: 'Welcome to EnglishAI Chat! Your account is ready to use.',
          details: 'You can start exploring all the features immediately.',
          actionText: 'Continue to Dashboard',
          showEmailNote: false
        };
      default:
        return {
          icon: 'CheckCircle',
          iconColor: 'text-green-600',
          iconBg: 'bg-green-100',
          title: 'Registration Successful!',
          message: 'Welcome to EnglishAI Chat!',
          details: 'Your account has been created successfully.',
          actionText: 'Continue to Dashboard',
          showEmailNote: false
        };
    }
  };

  const content = getModalContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center">
          <div className={`w-16 h-16 ${content.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon name={content.icon} size={32} className={content.iconColor} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
          <p className="text-lg text-gray-700 mb-3">{content.message}</p>
          <p className="text-sm text-gray-600">{content.details}</p>
        </div>

        {/* Email verification note */}
        {content.showEmailNote && (
          <div className="px-6 pb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-blue-800 font-medium mb-1">Email Verification</p>
                  <p className="text-blue-700">
                    Don't see the email? Check your spam folder or contact support if you need help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
          >
            {content.actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;