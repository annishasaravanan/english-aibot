import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProgressTracker = ({ stats, achievements }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock progress data
  const progressData = {
    week: [
      { day: 'Mon', words: 8, quizzes: 2, accuracy: 85 },
      { day: 'Tue', words: 12, quizzes: 3, accuracy: 92 },
      { day: 'Wed', words: 6, quizzes: 1, accuracy: 78 },
      { day: 'Thu', words: 15, quizzes: 4, accuracy: 88 },
      { day: 'Fri', words: 10, quizzes: 2, accuracy: 95 },
      { day: 'Sat', words: 14, quizzes: 3, accuracy: 90 },
      { day: 'Sun', words: 9, quizzes: 2, accuracy: 87 }
    ],
    month: [
      { period: 'Week 1', words: 45, quizzes: 12, accuracy: 85 },
      { period: 'Week 2', words: 52, quizzes: 15, accuracy: 88 },
      { period: 'Week 3', words: 38, quizzes: 10, accuracy: 92 },
      { period: 'Week 4', words: 41, quizzes: 11, accuracy: 89 }
    ],
    year: [
      { period: 'Jan', words: 180, quizzes: 45, accuracy: 85 },
      { period: 'Feb', words: 165, quizzes: 42, accuracy: 88 },
      { period: 'Mar', words: 195, quizzes: 48, accuracy: 90 },
      { period: 'Apr', words: 210, quizzes: 52, accuracy: 92 }
    ]
  };

  const categoryProgress = [
    { category: 'Academic', learned: 45, total: 100, color: 'primary' },
    { category: 'Business', learned: 32, total: 80, color: 'secondary' },
    { category: 'Literature', learned: 28, total: 60, color: 'accent' },
    { category: 'Science', learned: 18, total: 40, color: 'warning' },
    { category: 'General', learned: 124, total: 220, color: 'error' }
  ];

  const learningStreak = {
    current: 12,
    longest: 28,
    thisMonth: 18,
    weeklyGoal: 7,
    monthlyGoal: 30
  };

  const timeframes = [
    { id: 'week', label: 'This Week', icon: 'Calendar' },
    { id: 'month', label: 'This Month', icon: 'CalendarDays' },
    { id: 'year', label: 'This Year', icon: 'CalendarRange' }
  ];

  const getColorClass = (color, type = 'bg') => {
    const colorMap = {
      primary: type === 'bg' ? 'bg-primary-500' : 'text-primary-600',
      secondary: type === 'bg' ? 'bg-secondary-500' : 'text-secondary-600',
      accent: type === 'bg' ? 'bg-accent-500' : 'text-accent-600',
      warning: type === 'bg' ? 'bg-warning-500' : 'text-warning-600',
      error: type === 'bg' ? 'bg-error-500' : 'text-error-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  const calculateAverage = (data, field) => {
    const sum = data.reduce((acc, item) => acc + item[field], 0);
    return Math.round(sum / data.length);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-700">{stats.wordsLearned}</div>
              <div className="text-sm text-primary-600">Words Learned</div>
            </div>
          </div>
          <div className="text-xs text-primary-600">
            {stats.totalWords - stats.wordsLearned} remaining
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
              <Icon name="Flame" size={20} color="white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-700">{learningStreak.current}</div>
              <div className="text-sm text-accent-600">Day Streak</div>
            </div>
          </div>
          <div className="text-xs text-accent-600">
            Best: {learningStreak.longest} days
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} color="white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary-700">{stats.masteryPercentage}%</div>
              <div className="text-sm text-secondary-600">Mastery</div>
            </div>
          </div>
          <div className="text-xs text-secondary-600">
            Above average
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-50 to-warning-100 border border-warning-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-warning-500 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-warning-700">{stats.completedThisWeek}</div>
              <div className="text-sm text-warning-600">This Week</div>
            </div>
          </div>
          <div className="text-xs text-warning-600">
            Goal: {stats.weeklyGoal} words
          </div>
        </div>
      </div>

      {/* Learning Progress Chart */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-0">
            Learning Progress
          </h3>
          
          <div className="flex space-x-1 bg-surface-100 p-1 rounded-lg">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-surface text-primary-600 shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={timeframe.icon} size={14} />
                <span>{timeframe.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {progressData[selectedTimeframe].map((item, index) => {
            const maxWords = Math.max(...progressData[selectedTimeframe].map(d => d.words));
            const widthPercentage = (item.words / maxWords) * 100;
            
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-text-secondary">
                  {item.day || item.period}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-primary">{item.words} words</span>
                    <span className="text-xs text-text-secondary">{item.accuracy}% accuracy</span>
                  </div>
                  <div className="h-3 bg-surface-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${widthPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-xl font-bold text-text-primary">
              {progressData[selectedTimeframe].reduce((sum, item) => sum + item.words, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Words</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-text-primary">
              {calculateAverage(progressData[selectedTimeframe], 'accuracy')}%
            </div>
            <div className="text-sm text-text-secondary">Avg Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-text-primary">
              {progressData[selectedTimeframe].reduce((sum, item) => sum + item.quizzes, 0)}
            </div>
            <div className="text-sm text-text-secondary">Quizzes Taken</div>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Progress by Category
        </h3>
        
        <div className="space-y-4">
          {categoryProgress.map((category, index) => {
            const percentage = Math.round((category.learned / category.total) * 100);
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">
                    {category.category}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {category.learned}/{category.total} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getColorClass(category.color)} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Achievements
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement.earned 
                  ? 'bg-accent-50 border-accent-200' :'bg-surface-50 border-border opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-accent-400 to-accent-600' :'bg-surface-200'
                }`}>
                  <Icon 
                    name={achievement.icon} 
                    size={24} 
                    color={achievement.earned ? "white" : "#9CA3AF"} 
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.earned ? 'text-accent-800' : 'text-text-secondary'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${
                    achievement.earned ? 'text-accent-600' : 'text-text-secondary'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <Icon name="CheckCircle" size={20} className="text-accent-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Learning Goals
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={20} className="text-primary-600" />
              <div>
                <div className="font-medium text-primary-800">Weekly Goal</div>
                <div className="text-sm text-primary-600">Learn {learningStreak.weeklyGoal} new words</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary-700">
                {stats.completedThisWeek}/{learningStreak.weeklyGoal}
              </div>
              <div className="text-xs text-primary-600">
                {Math.round((stats.completedThisWeek / learningStreak.weeklyGoal) * 100)}% complete
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-secondary-600" />
              <div>
                <div className="font-medium text-secondary-800">Monthly Goal</div>
                <div className="text-sm text-secondary-600">Maintain {learningStreak.monthlyGoal}-day streak</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-secondary-700">
                {learningStreak.thisMonth}/{learningStreak.monthlyGoal}
              </div>
              <div className="text-xs text-secondary-600">
                {Math.round((learningStreak.thisMonth / learningStreak.monthlyGoal) * 100)}% complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;