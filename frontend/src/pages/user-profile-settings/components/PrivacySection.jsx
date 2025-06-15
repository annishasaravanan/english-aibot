import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PrivacySection = ({ userData, onSave }) => {
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analyticsTracking: true,
    personalizedAds: false,
    profileVisibility: 'private',
    learningDataBackup: true,
    crossDeviceSync: true,
    voiceDataStorage: false,
    conversationHistory: true
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleToggle = (setting) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleVisibilityChange = (visibility) => {
    setPrivacy(prev => ({
      ...prev,
      profileVisibility: visibility
    }));
  };

  const handleSave = () => {
    onSave(privacy);
  };

  const handleDataExport = () => {
    setShowExportModal(true);
    // Simulate data export
    setTimeout(() => {
      setShowExportModal(false);
      // In real app, this would trigger a download
      alert('Your data export has been prepared and will be sent to your email.');
    }, 2000);
  };

  const handleAccountDeletion = () => {
    setShowDeleteModal(true);
  };

  const confirmAccountDeletion = () => {
    // In real app, this would handle account deletion
    alert('Account deletion request has been submitted. You will receive a confirmation email.');
    setShowDeleteModal(false);
  };

  const ToggleSwitch = ({ title, description, setting, icon, color = 'primary', warning = false }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg ${warning ? 'bg-error-light border border-error-200' : 'bg-surface-50'}`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${warning ? 'bg-error-100' : `bg-${color}-100`}`}>
          <Icon name={icon} size={18} className={warning ? 'text-error-600' : `text-${color}-600`} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-text-primary">{title}</h4>
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={() => handleToggle(setting)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          privacy[setting] ? (warning ? 'bg-error' : `bg-${color}`) : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            privacy[setting] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Data Privacy */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Data Privacy</h3>
        <p className="text-sm text-text-secondary mb-6">
          Control how your learning data is used and shared
        </p>
        
        <div className="space-y-4">
          <ToggleSwitch
            title="Data Sharing with Partners"
            description="Allow sharing anonymized learning data to improve AI models"
            setting="dataSharing"
            icon="Share2"
            color="primary"
          />
          
          <ToggleSwitch
            title="Analytics Tracking"
            description="Help us improve the app by sharing usage analytics"
            setting="analyticsTracking"
            icon="BarChart3"
            color="secondary"
          />
          
          <ToggleSwitch
            title="Personalized Advertisements"
            description="Show ads based on your learning preferences and progress"
            setting="personalizedAds"
            icon="Target"
            color="accent"
          />
          
          <ToggleSwitch
            title="Voice Data Storage"
            description="Store voice recordings to improve speech recognition"
            setting="voiceDataStorage"
            icon="Mic"
            color="primary"
            warning={true}
          />
        </div>
      </div>

      {/* Profile Visibility */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Profile Visibility</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose who can see your learning profile and progress
        </p>
        
        <div className="space-y-3">
          {[
            { value: 'private', label: 'Private', description: 'Only you can see your profile and progress', icon: 'Lock' },
            { value: 'friends', label: 'Friends Only', description: 'Only your friends can see your learning activity', icon: 'Users' },
            { value: 'public', label: 'Public', description: 'Anyone can see your profile and achievements', icon: 'Globe' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleVisibilityChange(option.value)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                privacy.profileVisibility === option.value
                  ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={option.icon} size={18} className={privacy.profileVisibility === option.value ? 'text-primary' : 'text-text-secondary'} />
                  <div>
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="text-sm text-text-secondary">{option.description}</p>
                  </div>
                </div>
                {privacy.profileVisibility === option.value && (
                  <Icon name="Check" size={18} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Data Management</h3>
        <p className="text-sm text-text-secondary mb-6">
          Manage your learning data and conversation history
        </p>
        
        <div className="space-y-4">
          <ToggleSwitch
            title="Learning Data Backup"
            description="Automatically backup your progress and achievements"
            setting="learningDataBackup"
            icon="Cloud"
            color="accent"
          />
          
          <ToggleSwitch
            title="Cross-Device Sync"
            description="Sync your progress across all your devices"
            setting="crossDeviceSync"
            icon="RefreshCw"
            color="secondary"
          />
          
          <ToggleSwitch
            title="Conversation History"
            description="Save your AI chat conversations for review"
            setting="conversationHistory"
            icon="MessageSquare"
            color="primary"
          />
        </div>
      </div>

      {/* Data Export & Deletion */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Data Rights</h3>
        <p className="text-sm text-text-secondary mb-6">
          Exercise your rights regarding your personal data
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-primary-100">
                <Icon name="Download" size={18} className="text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">Export Your Data</h4>
                <p className="text-sm text-text-secondary mt-1">
                  Download all your learning data, conversations, and progress
                </p>
              </div>
            </div>
            <button
              onClick={handleDataExport}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm font-medium"
            >
              Export Data
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-error-light rounded-lg border border-error-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-error-100">
                <Icon name="Trash2" size={18} className="text-error-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">Delete Account</h4>
                <p className="text-sm text-text-secondary mt-1">
                  Permanently delete your account and all associated data
                </p>
              </div>
            </div>
            <button
              onClick={handleAccountDeletion}
              className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Information */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Privacy Information</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={18} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Data Encryption</p>
              <p className="text-sm text-text-secondary">
                All your data is encrypted in transit and at rest
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Lock" size={18} className="text-secondary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Secure Storage</p>
              <p className="text-sm text-text-secondary">
                Your learning data is stored on secure, GDPR-compliant servers
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Eye" size={18} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Transparency</p>
              <p className="text-sm text-text-secondary">
                We're transparent about how we collect and use your data
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-primary-200">
          <p className="text-sm text-text-secondary">
            Read our full{' '}
            <button className="text-primary hover:text-primary-600 underline">
              Privacy Policy
            </button>{' '}
            and{' '}
            <button className="text-primary hover:text-primary-600 underline">
              Terms of Service
            </button>
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
        >
          Save Privacy Settings
        </button>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Download" size={24} className="text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Preparing Your Data</h3>
              <p className="text-sm text-text-secondary">
                We're collecting all your learning data. This may take a few moments...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Delete Account?</h3>
              <p className="text-sm text-text-secondary mb-6">
                This action cannot be undone. All your learning progress, conversations, and data will be permanently deleted.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-surface-100 text-text-secondary rounded-lg hover:bg-surface-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAccountDeletion}
                  className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySection;