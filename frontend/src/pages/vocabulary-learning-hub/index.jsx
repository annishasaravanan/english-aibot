import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import FlashcardComponent from './components/FlashcardComponent';
import DailyWordChallenge from './components/DailyWordChallenge';
import VocabularyQuiz from './components/VocabularyQuiz';
import ProgressTracker from './components/ProgressTracker';
import FilterOptions from './components/FilterOptions';

const VocabularyLearningHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flashcards');
  const [currentStreak, setCurrentStreak] = useState(12);
  const [dailyGoalProgress, setDailyGoalProgress] = useState(75);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [masteryLevel, setMasteryLevel] = useState(68);

  // Mock data for vocabulary progress
  const progressStats = {
    wordsLearned: 247,
    totalWords: 500,
    weeklyGoal: 50,
    completedThisWeek: 38,
    streakDays: 12,
    masteryPercentage: 68
  };

  const achievements = [
    { id: 1, name: "Word Master", icon: "Trophy", earned: true, description: "Learn 100 words" },
    { id: 2, name: "Streak Champion", icon: "Flame", earned: true, description: "7-day learning streak" },
    { id: 3, name: "Quiz Expert", icon: "Target", earned: false, description: "Score 90% on 10 quizzes" },
    { id: 4, name: "Pronunciation Pro", icon: "Mic", earned: false, description: "Practice pronunciation 50 times" }
  ];

  const tabOptions = [
    { id: 'flashcards', label: 'Flashcards', icon: 'BookOpen', count: 25 },
    { id: 'challenge', label: 'Daily Challenge', icon: 'Star', count: 1 },
    { id: 'quiz', label: 'Quiz', icon: 'Brain', count: 8 },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp', count: null }
  ];

  useEffect(() => {
    // Simulate progress updates
    const interval = setInterval(() => {
      if (dailyGoalProgress < 100) {
        setDailyGoalProgress(prev => Math.min(prev + 1, 100));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dailyGoalProgress]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'flashcards':
        return <FlashcardComponent filter={selectedFilter} onProgress={setMasteryLevel} />;
      case 'challenge':
        return <DailyWordChallenge onComplete={() => setCurrentStreak(prev => prev + 1)} />;
      case 'quiz':
        return <VocabularyQuiz filter={selectedFilter} onComplete={setDailyGoalProgress} />;
      case 'progress':
        return <ProgressTracker stats={progressStats} achievements={achievements} />;
      default:
        return <FlashcardComponent filter={selectedFilter} onProgress={setMasteryLevel} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="lg:ml-64 pt-16 pb-20 lg:pb-8">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                  Vocabulary Learning Hub
                </h1>
                <p className="text-text-secondary">
                  Master new words through interactive practice and challenges
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 bg-accent-50 px-3 py-2 rounded-lg">
                  <Icon name="Flame" size={18} className="text-accent-600" />
                  <span className="text-sm font-medium text-accent-700">{currentStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-2 bg-primary-50 px-3 py-2 rounded-lg">
                  <Icon name="Target" size={18} className="text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">{dailyGoalProgress}% daily goal</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-surface border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">Daily Learning Goal</span>
                <span className="text-sm text-text-secondary">{dailyGoalProgress}% Complete</span>
              </div>
              <div className="progress-indicator h-2">
                <div 
                  className="progress-bar rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${dailyGoalProgress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
                <span>0 words</span>
                <span>20 words</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-surface-100 p-1 rounded-lg overflow-x-auto">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-gentle whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-surface text-primary-600 shadow-sm border border-primary-200'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-50'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700' :'bg-surface text-text-secondary'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Options - Show for flashcards and quiz tabs */}
          {(activeTab === 'flashcards' || activeTab === 'quiz') && (
            <div className="mb-6">
              <FilterOptions 
                selectedFilter={selectedFilter} 
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Tab Content */}
          <div className="animation-fade-in">
            {renderTabContent()}
          </div>

          {/* Achievement Badges - Mobile */}
          <div className="lg:hidden mt-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.filter(achievement => achievement.earned).slice(0, 2).map((achievement) => (
                <div key={achievement.id} className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name={achievement.icon} size={20} color="white" />
                  </div>
                  <h4 className="text-sm font-medium text-text-primary mb-1">{achievement.name}</h4>
                  <p className="text-xs text-text-secondary">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setActiveTab('challenge')}
          className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg flex items-center justify-center animation-breathing"
        >
          <Icon name="Plus" size={24} color="white" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default VocabularyLearningHub;