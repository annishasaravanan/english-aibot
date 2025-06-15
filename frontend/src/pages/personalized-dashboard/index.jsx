import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import WelcomeSection from './components/WelcomeSection';
import ContinueConversationCard from './components/ContinueConversationCard';
import DailyVocabularyCard from './components/DailyVocabularyCard';
import GrammarTipCard from './components/GrammarTipCard';
import ProgressTrackingCard from './components/ProgressTrackingCard';
import QuickAccessButtons from './components/QuickAccessButtons';
import StatisticsCards from './components/StatisticsCards';

const PersonalizedDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    level: "Intermediate",
    streak: 7,
    joinDate: "2024-01-15",
    preferences: {
      learningGoals: ["Business English", "Conversation Skills"],
      dailyTarget: 30
    }
  };

  // Mock dashboard data
  const dashboardData = {
    lastConversation: {
      topic: "Travel Planning",
      preview: "We were discussing your upcoming trip to Japan and the best ways to ask for directions...",
      timestamp: "2 hours ago",
      messagesCount: 15
    },
    dailyVocabulary: {
      word: "Serendipity",
      pronunciation: "/ˌserənˈdipədē/",
      meaning: "The occurrence and development of events by chance in a happy or beneficial way",
      example: "Meeting my best friend was pure serendipity - we bumped into each other at a coffee shop.",
      synonyms: ["Chance", "Fortune", "Luck"],
      difficulty: "Advanced"
    },
    grammarTip: {
      title: "Present Perfect vs Simple Past",
      explanation: "Use Present Perfect for actions that happened at an unspecified time or have relevance to now.",
      example: {
        correct: "I have visited Paris three times.",
        incorrect: "I visited Paris three times.",
        reason: "When the specific time isn\'t mentioned and the experience is relevant to the present."
      }
    },
    weeklyProgress: {
      wordsLearned: 23,
      target: 30,
      chatsCompleted: 8,
      grammarScore: 85,
      streakDays: 7
    },
    quickStats: {
      totalWordsLearned: 1247,
      totalChatsCompleted: 156,
      averageGrammarScore: 82,
      currentStreak: 7,
      longestStreak: 15
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="lg:ml-64 pt-16 pb-20 lg:pb-8">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          {/* Pull to Refresh Indicator */}
          {isRefreshing && (
            <div className="fixed top-16 left-0 right-0 z-50 bg-primary text-white py-2 px-4 text-center text-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin">
                  <Icon name="RefreshCw" size={16} />
                </div>
                <span>Updating your progress...</span>
              </div>
            </div>
          )}

          {/* Welcome Section */}
          <WelcomeSection 
            greeting={getGreeting()}
            userName={userData.name}
            level={userData.level}
            streak={userData.streak}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Primary Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Conversation Card */}
              <ContinueConversationCard 
                conversation={dashboardData.lastConversation}
                onContinue={() => navigate('/ai-chat-interface')}
              />

              {/* Quick Access Buttons */}
              <QuickAccessButtons navigate={navigate} />

              {/* Daily Features Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DailyVocabularyCard 
                  vocabulary={dashboardData.dailyVocabulary}
                  onPractice={() => navigate('/vocabulary-learning-hub')}
                />
                <GrammarTipCard 
                  tip={dashboardData.grammarTip}
                  onPractice={() => navigate('/grammar-correction-tool')}
                />
              </div>
            </div>

            {/* Right Column - Progress & Stats */}
            <div className="space-y-6">
              <ProgressTrackingCard 
                progress={dashboardData.weeklyProgress}
                userLevel={userData.level}
              />
              
              <StatisticsCards 
                stats={dashboardData.quickStats}
                weeklyProgress={dashboardData.weeklyProgress}
              />
            </div>
          </div>

          {/* Learning Insights Section */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Today's Learning Insight
                </h3>
                <p className="text-text-secondary mb-4">
                  You're making excellent progress with business vocabulary! Your recent conversations show 
                  improved confidence in professional contexts. Consider practicing more complex sentence 
                  structures to reach the next level.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                    Business English
                  </span>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    Sentence Structure
                  </span>
                  <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                    Confidence Building
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Refresh Button for Manual Update */}
          <div className="mt-8 text-center">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon 
                name="RefreshCw" 
                size={16} 
                className={isRefreshing ? 'animate-spin' : ''} 
              />
              <span className="text-sm">
                {isRefreshing ? 'Updating...' : 'Refresh Dashboard'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;