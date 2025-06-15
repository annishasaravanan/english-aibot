import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AppearanceSection = ({ userData, onSave, isDarkMode, setIsDarkMode }) => {
  const [appearance, setAppearance] = useState({
    darkMode: userData.appearance.darkMode,
    fontSize: userData.appearance.fontSize,
    highContrast: userData.appearance.highContrast,
    reducedMotion: false,
    compactMode: false,
    colorTheme: 'default'
  });

  const fontSizes = [
    { value: 'small', label: 'Small', description: 'Compact text for more content', preview: 'text-sm' },
    { value: 'medium', label: 'Medium', description: 'Standard comfortable reading', preview: 'text-base' },
    { value: 'large', label: 'Large', description: 'Larger text for better readability', preview: 'text-lg' },
    { value: 'extra-large', label: 'Extra Large', description: 'Maximum readability', preview: 'text-xl' }
  ];

  const colorThemes = [
    { value: 'default', label: 'Default', primary: 'bg-primary', secondary: 'bg-secondary', accent: 'bg-accent' },
    { value: 'ocean', label: 'Ocean', primary: 'bg-blue-500', secondary: 'bg-cyan-500', accent: 'bg-teal-500' },
    { value: 'forest', label: 'Forest', primary: 'bg-green-600', secondary: 'bg-emerald-500', accent: 'bg-lime-500' },
    { value: 'sunset', label: 'Sunset', primary: 'bg-orange-500', secondary: 'bg-red-500', accent: 'bg-pink-500' },
    { value: 'lavender', label: 'Lavender', primary: 'bg-purple-500', secondary: 'bg-violet-500', accent: 'bg-fuchsia-500' }
  ];

  const handleToggle = (setting) => {
    const newValue = !appearance[setting];
    setAppearance(prev => ({
      ...prev,
      [setting]: newValue
    }));
    
    if (setting === 'darkMode') {
      setIsDarkMode(newValue);
    }
  };

  const handleFontSizeChange = (size) => {
    setAppearance(prev => ({
      ...prev,
      fontSize: size
    }));
  };

  const handleThemeChange = (theme) => {
    setAppearance(prev => ({
      ...prev,
      colorTheme: theme
    }));
  };

  const handleSave = () => {
    onSave(appearance);
  };

  const ToggleSwitch = ({ title, description, setting, icon, color = 'primary' }) => (
    <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon name={icon} size={18} className={`text-${color}-600`} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-text-primary">{title}</h4>
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={() => handleToggle(setting)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          appearance[setting] ? `bg-${color}` : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            appearance[setting] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Theme Mode</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose between light and dark themes for comfortable viewing
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleToggle('darkMode')}
            className={`p-6 rounded-lg border-2 transition-all duration-200 ${
              !appearance.darkMode
                ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon name="Sun" size={24} className={!appearance.darkMode ? 'text-primary' : 'text-text-secondary'} />
              {!appearance.darkMode && <Icon name="Check" size={18} className="text-primary" />}
            </div>
            <h4 className="font-medium text-left mb-2">Light Mode</h4>
            <p className="text-sm text-text-secondary text-left">
              Clean and bright interface for daytime use
            </p>
          </button>
          
          <button
            onClick={() => handleToggle('darkMode')}
            className={`p-6 rounded-lg border-2 transition-all duration-200 ${
              appearance.darkMode
                ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon name="Moon" size={24} className={appearance.darkMode ? 'text-primary' : 'text-text-secondary'} />
              {appearance.darkMode && <Icon name="Check" size={18} className="text-primary" />}
            </div>
            <h4 className="font-medium text-left mb-2">Dark Mode</h4>
            <p className="text-sm text-text-secondary text-left">
              Easy on the eyes for low-light environments
            </p>
          </button>
        </div>
      </div>

      {/* Font Size */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Font Size</h3>
        <p className="text-sm text-text-secondary mb-6">
          Adjust text size for comfortable reading
        </p>
        
        <div className="space-y-3">
          {fontSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => handleFontSizeChange(size.value)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                appearance.fontSize === size.value
                  ? 'border-secondary bg-secondary-50 text-secondary-700' :'border-border bg-surface hover:border-secondary-200 hover:bg-secondary-25'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{size.label}</h4>
                    <span className={`${size.preview} text-text-primary`}>Sample Text</span>
                  </div>
                  <p className="text-sm text-text-secondary">{size.description}</p>
                </div>
                {appearance.fontSize === size.value && (
                  <Icon name="Check" size={18} className="text-secondary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Themes */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Color Theme</h3>
        <p className="text-sm text-text-secondary mb-6">
          Personalize your learning experience with different color schemes
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorThemes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                appearance.colorTheme === theme.value
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary">{theme.label}</h4>
                {appearance.colorTheme === theme.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
              <div className="flex space-x-2">
                <div className={`w-6 h-6 rounded-full ${theme.primary}`}></div>
                <div className={`w-6 h-6 rounded-full ${theme.secondary}`}></div>
                <div className={`w-6 h-6 rounded-full ${theme.accent}`}></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Options */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Accessibility</h3>
        <p className="text-sm text-text-secondary mb-6">
          Customize the interface for better accessibility and comfort
        </p>
        
        <div className="space-y-4">
          <ToggleSwitch
            title="High Contrast Mode"
            description="Increase contrast for better visibility"
            setting="highContrast"
            icon="Eye"
            color="accent"
          />
          
          <ToggleSwitch
            title="Reduced Motion"
            description="Minimize animations and transitions"
            setting="reducedMotion"
            icon="Zap"
            color="secondary"
          />
          
          <ToggleSwitch
            title="Compact Mode"
            description="Reduce spacing for more content on screen"
            setting="compactMode"
            icon="Minimize2"
            color="primary"
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Preview</h3>
        <div className="space-y-4">
          <div className={`p-4 bg-white rounded-lg border ${appearance.highContrast ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-full ${colorThemes.find(t => t.value === appearance.colorTheme)?.primary}`}></div>
              <div>
                <h4 className={`font-medium ${fontSizes.find(f => f.value === appearance.fontSize)?.preview} ${appearance.highContrast ? 'text-black' : 'text-text-primary'}`}>
                  Sample Conversation
                </h4>
                <p className={`text-sm ${appearance.highContrast ? 'text-gray-800' : 'text-text-secondary'}`}>
                  This is how your chat interface will look
                </p>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${colorThemes.find(t => t.value === appearance.colorTheme)?.primary} text-white`}>
              <p className={fontSizes.find(f => f.value === appearance.fontSize)?.preview}>
                Hello! How can I help you practice English today?
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Current settings: {appearance.darkMode ? 'Dark' : 'Light'} mode, 
              {fontSizes.find(f => f.value === appearance.fontSize)?.label.toLowerCase()} font, 
              {colorThemes.find(t => t.value === appearance.colorTheme)?.label.toLowerCase()} theme
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
        >
          Save Appearance Settings
        </button>
      </div>
    </div>
  );
};

export default AppearanceSection;