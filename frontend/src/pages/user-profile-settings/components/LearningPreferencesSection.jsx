import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LearningPreferencesSection = ({ userData, onSave }) => {
  const [preferences, setPreferences] = useState({
    englishLevel: userData.englishLevel,
    learningGoals: userData.learningGoals,
    preferredTopics: userData.preferredTopics,
    conversationDifficulty: userData.conversationDifficulty
  });

  const englishLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting to learn English' },
    { value: 'elementary', label: 'Elementary', description: 'Basic understanding and simple conversations' },
    { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with everyday conversations' },
    { value: 'upper-intermediate', label: 'Upper Intermediate', description: 'Can handle complex topics and discussions' },
    { value: 'advanced', label: 'Advanced', description: 'Fluent in most situations' },
    { value: 'proficient', label: 'Proficient', description: 'Near-native level proficiency' }
  ];

  const availableGoals = [
    'Business Communication',
    'Academic Writing',
    'Conversation Skills',
    'Grammar Improvement',
    'Vocabulary Building',
    'Pronunciation',
    'Exam Preparation',
    'Travel English',
    'Technical English',
    'Creative Writing'
  ];

  const availableTopics = [
    'Technology',
    'Travel',
    'Business',
    'Culture',
    'Science',
    'Sports',
    'Food',
    'Entertainment',
    'Health',
    'Education',
    'Environment',
    'Politics',
    'Art',
    'Music',
    'Literature',
    'History'
  ];

  const difficultyLevels = [
    { value: 'easy', label: 'Easy', description: 'Simple vocabulary and basic grammar' },
    { value: 'medium', label: 'Medium', description: 'Moderate complexity with varied vocabulary' },
    { value: 'hard', label: 'Hard', description: 'Advanced vocabulary and complex structures' },
    { value: 'adaptive', label: 'Adaptive', description: 'AI adjusts difficulty based on performance' }
  ];

  const handleLevelChange = (level) => {
    setPreferences(prev => ({ ...prev, englishLevel: level }));
  };

  const handleGoalToggle = (goal) => {
    setPreferences(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter(g => g !== goal)
        : [...prev.learningGoals, goal]
    }));
  };

  const handleTopicToggle = (topic) => {
    setPreferences(prev => ({
      ...prev,
      preferredTopics: prev.preferredTopics.includes(topic)
        ? prev.preferredTopics.filter(t => t !== topic)
        : [...prev.preferredTopics, topic]
    }));
  };

  const handleDifficultyChange = (difficulty) => {
    setPreferences(prev => ({ ...prev, conversationDifficulty: difficulty }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <div className="space-y-6">
      {/* English Level */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">English Level</h3>
        <p className="text-sm text-text-secondary mb-6">
          Select your current English proficiency level to get personalized content
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {englishLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => handleLevelChange(level.value)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                preferences.englishLevel === level.value
                  ? 'border-primary bg-primary-50 text-primary-700' :'border-border bg-surface hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{level.label}</h4>
                {preferences.englishLevel === level.value && (
                  <Icon name="CheckCircle" size={18} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-text-secondary">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Learning Goals</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose what you want to focus on (select multiple goals)
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableGoals.map((goal) => (
            <button
              key={goal}
              onClick={() => handleGoalToggle(goal)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                preferences.learningGoals.includes(goal)
                  ? 'border-primary bg-primary text-white' :'border-border bg-surface text-text-primary hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-surface-50 rounded-lg">
          <p className="text-sm text-text-secondary">
            Selected: {preferences.learningGoals.length} goal{preferences.learningGoals.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Preferred Topics */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Preferred Topics</h3>
        <p className="text-sm text-text-secondary mb-6">
          Select topics you're interested in for conversation practice
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {availableTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicToggle(topic)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                preferences.preferredTopics.includes(topic)
                  ? 'border-secondary bg-secondary text-white' :'border-border bg-surface text-text-primary hover:border-secondary-200 hover:bg-secondary-25'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-surface-50 rounded-lg">
          <p className="text-sm text-text-secondary">
            Selected: {preferences.preferredTopics.length} topic{preferences.preferredTopics.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Conversation Difficulty */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Conversation Difficulty</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose the complexity level for AI conversations
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {difficultyLevels.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => handleDifficultyChange(difficulty.value)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                preferences.conversationDifficulty === difficulty.value
                  ? 'border-accent bg-accent-50 text-accent-700' :'border-border bg-surface hover:border-accent-200 hover:bg-accent-25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{difficulty.label}</h4>
                {preferences.conversationDifficulty === difficulty.value && (
                  <Icon name="CheckCircle" size={18} className="text-accent" />
                )}
              </div>
              <p className="text-sm text-text-secondary">{difficulty.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Preview Your Settings</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">English Level:</span>
            <span className="font-medium text-primary capitalize">{preferences.englishLevel.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Learning Goals:</span>
            <span className="font-medium text-primary">{preferences.learningGoals.length} selected</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Preferred Topics:</span>
            <span className="font-medium text-primary">{preferences.preferredTopics.length} selected</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Difficulty:</span>
            <span className="font-medium text-primary capitalize">{preferences.conversationDifficulty}</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
        >
          Save Learning Preferences
        </button>
      </div>
    </div>
  );
};

export default LearningPreferencesSection;