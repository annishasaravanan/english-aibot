import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

// Components
import PersonalInfoSection from './components/PersonalInfoSection';
import LearningPreferencesSection from './components/LearningPreferencesSection';
import LanguageSettingsSection from './components/LanguageSettingsSection';
import NotificationSection from './components/NotificationSection';
import AppearanceSection from './components/AppearanceSection';
import PrivacySection from './components/PrivacySection';
import StatisticsSection from './components/StatisticsSection';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    age: 28,
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    englishLevel: "intermediate",
    learningGoals: ["Business Communication", "Academic Writing", "Conversation Skills"],
    preferredTopics: ["Technology", "Travel", "Business", "Culture"],
    conversationDifficulty: "medium",
    uiLanguage: "English",
    pronunciationVariant: "American",
    regionalVocabulary: "US",
    notifications: {
      dailyReminders: true,
      achievementAlerts: true,
      learningStreak: true,
      reminderTime: "09:00"
    },
    appearance: {
      darkMode: false,
      fontSize: "medium",
      highContrast: false
    },
    statistics: {
      accountCreated: "2023-06-15",
      totalLearningTime: "127 hours",
      wordsLearned: 1247,
      chatsCompleted: 89,
      grammarScore: 85,
      currentStreak: 12
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'learning', label: 'Learning Preferences', icon: 'BookOpen' },
    { id: 'language', label: 'Language Settings', icon: 'Globe' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'appearance', label: 'Appearance', icon: 'Palette' },
    { id: 'privacy', label: 'Privacy & Data', icon: 'Shield' },
    { id: 'statistics', label: 'Statistics', icon: 'BarChart3' }
  ];

  const handleSave = (sectionData) => {
    setSaveStatus('saving');
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection userData={userData} onSave={handleSave} />;
      case 'learning':
        return <LearningPreferencesSection userData={userData} onSave={handleSave} />;
      case 'language':
        return <LanguageSettingsSection userData={userData} onSave={handleSave} />;
      case 'notifications':
        return <NotificationSection userData={userData} onSave={handleSave} />;
      case 'appearance':
        return <AppearanceSection userData={userData} onSave={handleSave} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'privacy':
        return <PrivacySection userData={userData} onSave={handleSave} />;
      case 'statistics':
        return <StatisticsSection userData={userData} />;
      default:
        return <PersonalInfoSection userData={userData} onSave={handleSave} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="pt-16 pb-20">
          {/* Profile Header */}
          <div className="bg-surface border-b border-border px-4 py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={userData.profilePhoto}
                  alt={userData.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-surface flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-text-primary">{userData.name}</h1>
                <p className="text-sm text-text-secondary">{userData.email}</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  <span className="text-xs text-accent-600 font-medium">
                    {userData.statistics.currentStreak} day streak
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="bg-surface border-b border-border px-4 py-3">
            <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-primary text-white' :'bg-surface-100 text-text-secondary hover:text-text-primary hover:bg-surface-200'
                  }`}
                >
                  <Icon name={section.icon} size={16} />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <div className="w-64 fixed left-0 top-16 bottom-0 bg-surface border-r border-border overflow-y-auto">
          {/* Profile Header */}
          <div className="p-6 border-b border-border">
            <div className="text-center">
              <div className="relative inline-block">
                <Image
                  src={userData.profilePhoto}
                  alt={userData.name}
                  className="w-20 h-20 rounded-full object-cover border-3 border-primary-200 mx-auto"
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent rounded-full border-2 border-surface flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-text-primary mt-3">{userData.name}</h2>
              <p className="text-sm text-text-secondary">{userData.email}</p>
              <div className="flex items-center justify-center mt-2">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                <span className="text-sm text-accent-600 font-medium">
                  {userData.statistics.currentStreak} day streak
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-600 border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                }`}
              >
                <Icon 
                  name={section.icon} 
                  size={18} 
                  className={activeSection === section.id ? 'text-primary-600' : 'text-text-secondary'} 
                />
                <span className="font-medium">{section.label}</span>
                {activeSection === section.id && (
                  <div className="w-2 h-2 bg-primary rounded-full ml-auto"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 pt-16">
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-text-primary mb-2">
                {sections.find(s => s.id === activeSection)?.label}
              </h1>
              <p className="text-text-secondary">
                Manage your account settings and learning preferences
              </p>
            </div>

            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Save Status Toast */}
      {saveStatus && (
        <div className={`fixed bottom-4 right-4 z-1000 px-4 py-2 rounded-lg shadow-lg animation-fade-in ${
          saveStatus === 'saving' ?'bg-primary text-white' :'bg-accent text-white'
        }`}>
          <div className="flex items-center space-x-2">
            {saveStatus === 'saving' ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <Icon name="Check" size={16} />
            )}
            <span className="text-sm font-medium">
              {saveStatus === 'saving' ? 'Saving...' : 'Settings saved!'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileSettings;