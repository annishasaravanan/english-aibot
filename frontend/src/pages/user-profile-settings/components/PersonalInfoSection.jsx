import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PersonalInfoSection = ({ userData, onSave }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    age: userData.age,
    profilePhoto: userData.profilePhoto
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      profilePhoto: userData.profilePhoto
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Image
              src={formData.profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-3 border-border"
            />
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-60 transition-all duration-200"
              >
                <Icon name="Camera" size={20} />
              </button>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary mb-2">
              Upload a new profile photo. Recommended size: 400x400px
            </p>
            {isEditing && (
              <div className="flex space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm font-medium"
                >
                  Upload Photo
                </button>
                <button
                  onClick={() => handleInputChange('profilePhoto', userData.profilePhoto)}
                  className="px-4 py-2 bg-surface-100 text-text-secondary rounded-lg hover:bg-surface-200 transition-colors duration-200 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              <Icon name="Edit2" size={16} />
              <span className="text-sm font-medium">Edit</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-surface-100 text-text-secondary rounded-lg hover:bg-surface-200 transition-colors duration-200 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-600 transition-colors duration-200 text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                placeholder="Enter your full name"
              />
            ) : (
              <div className="px-4 py-3 bg-surface-50 rounded-lg border border-border">
                <span className="text-text-primary">{formData.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                placeholder="Enter your email address"
              />
            ) : (
              <div className="px-4 py-3 bg-surface-50 rounded-lg border border-border">
                <span className="text-text-primary">{formData.email}</span>
              </div>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Age
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                placeholder="Enter your age"
                min="13"
                max="100"
              />
            ) : (
              <div className="px-4 py-3 bg-surface-50 rounded-lg border border-border">
                <span className="text-text-primary">{formData.age} years old</span>
              </div>
            )}
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Account Status
            </label>
            <div className="px-4 py-3 bg-surface-50 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-text-primary">Active Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-md font-medium text-text-primary mb-4">Account Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Member since:</span>
              <span className="text-text-primary font-medium">June 15, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Last login:</span>
              <span className="text-text-primary font-medium">Today, 2:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Account type:</span>
              <span className="text-accent-600 font-medium">Premium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Verification status:</span>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={14} className="text-accent" />
                <span className="text-accent font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;