import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LanguageSettingsSection = ({ userData, onSave }) => {
  const [settings, setSettings] = useState({
    uiLanguage: userData.uiLanguage,
    pronunciationVariant: userData.pronunciationVariant,
    regionalVocabulary: userData.regionalVocabulary
  });

  const uiLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const pronunciationVariants = [
    {
      value: 'american',
      label: 'American English',
      flag: '🇺🇸',
      description: 'Standard American pronunciation and vocabulary'
    },
    {
      value: 'british',
      label: 'British English',
      flag: '🇬🇧',
      description: 'Received Pronunciation and British vocabulary'
    },
    {
      value: 'australian',
      label: 'Australian English',
      flag: '🇦🇺',
      description: 'Australian accent and local expressions'
    },
    {
      value: 'canadian',
      label: 'Canadian English',
      flag: '🇨🇦',
      description: 'Canadian pronunciation and vocabulary'
    }
  ];

  const regionalVocabulary = [
    {
      value: 'us',
      label: 'United States',
      flag: '🇺🇸',
      examples: 'elevator, apartment, gas'
    },
    {
      value: 'uk',
      label: 'United Kingdom',
      flag: '🇬🇧',
      examples: 'lift, flat, petrol'
    },
    {
      value: 'au',
      label: 'Australia',
      flag: '🇦🇺',
      examples: 'arvo, brekkie, uni'
    },
    {
      value: 'ca',
      label: 'Canada',
      flag: '🇨🇦',
      examples: 'toque, loonie, eh'
    }
  ];

  const handleLanguageChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="space-y-6">
      {/* UI Language */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Interface Language</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose the language for the app interface and instructions
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {uiLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange('uiLanguage', language.name)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                settings.uiLanguage === language.name
                  ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <p className="font-medium">{language.name}</p>
                  {settings.uiLanguage === language.name && (
                    <Icon name="Check" size={14} className="text-primary mt-1" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-surface-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-primary" />
            <p className="text-sm text-text-secondary">
              Changing the interface language will require an app restart
            </p>
          </div>
        </div>
      </div>

      {/* Pronunciation Variant */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Pronunciation Variant</h3>
        <p className="text-sm text-text-secondary mb-6">
          Select your preferred English accent for speech synthesis and recognition
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pronunciationVariants.map((variant) => (
            <button
              key={variant.value}
              onClick={() => handleLanguageChange('pronunciationVariant', variant.value)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                settings.pronunciationVariant === variant.value
                  ? 'border-secondary bg-secondary-50 text-secondary-700' :'border-border bg-surface hover:border-secondary-200 hover:bg-secondary-25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{variant.flag}</span>
                  <h4 className="font-medium">{variant.label}</h4>
                </div>
                {settings.pronunciationVariant === variant.value && (
                  <Icon name="CheckCircle" size={18} className="text-secondary" />
                )}
              </div>
              <p className="text-sm text-text-secondary">{variant.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Regional Vocabulary */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Regional Vocabulary</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose which regional vocabulary and expressions to learn
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionalVocabulary.map((region) => (
            <button
              key={region.value}
              onClick={() => handleLanguageChange('regionalVocabulary', region.value)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                settings.regionalVocabulary === region.value
                  ? 'border-accent bg-accent-50 text-accent-700' :'border-border bg-surface hover:border-accent-200 hover:bg-accent-25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{region.flag}</span>
                  <h4 className="font-medium">{region.label}</h4>
                </div>
                {settings.regionalVocabulary === region.value && (
                  <Icon name="CheckCircle" size={18} className="text-accent" />
                )}
              </div>
              <p className="text-sm text-text-secondary mb-2">Examples:</p>
              <p className="text-sm font-medium text-text-primary">{region.examples}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Language Learning Tips */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Language Learning Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={18} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Consistency is Key</p>
              <p className="text-sm text-text-secondary">
                Stick to one pronunciation variant to avoid confusion
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Globe" size={18} className="text-secondary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Cultural Context</p>
              <p className="text-sm text-text-secondary">
                Regional vocabulary helps you understand cultural nuances
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Volume2" size={18} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Listen Actively</p>
              <p className="text-sm text-text-secondary">
                Use speech features to improve your pronunciation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Settings Preview */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Current Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
            <span className="text-text-secondary">Interface Language:</span>
            <span className="font-medium text-text-primary">{settings.uiLanguage}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
            <span className="text-text-secondary">Pronunciation:</span>
            <span className="font-medium text-text-primary capitalize">
              {settings.pronunciationVariant.replace('-', ' ')} English
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
            <span className="text-text-secondary">Regional Vocabulary:</span>
            <span className="font-medium text-text-primary">
              {regionalVocabulary.find(r => r.value === settings.regionalVocabulary)?.label}
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
        >
          Save Language Settings
        </button>
      </div>
    </div>
  );
};

export default LanguageSettingsSection;