import React from 'react';
import Icon from 'components/AppIcon';

const StatisticsSection = ({ userData }) => {
  const stats = userData.statistics;

  const achievementData = [
    { title: 'First Conversation', description: 'Completed your first AI chat', date: '2023-06-16', icon: 'MessageCircle', color: 'primary' },
    { title: 'Week Warrior', description: '7 days learning streak', date: '2023-06-22', icon: 'Flame', color: 'accent' },
    { title: 'Vocabulary Master', description: 'Learned 100 new words', date: '2023-07-01', icon: 'BookOpen', color: 'secondary' },
    { title: 'Grammar Guru', description: 'Perfect grammar score for 5 days', date: '2023-07-15', icon: 'CheckCircle', color: 'accent' },
    { title: 'Conversation Expert', description: 'Completed 50 AI conversations', date: '2023-08-01', icon: 'Users', color: 'primary' },
    { title: 'Dedication Badge', description: '30 days learning streak', date: '2023-08-15', icon: 'Award', color: 'secondary' }
  ];

  const weeklyProgress = [
    { day: 'Mon', minutes: 25, words: 12 },
    { day: 'Tue', minutes: 30, words: 15 },
    { day: 'Wed', minutes: 20, words: 8 },
    { day: 'Thu', minutes: 35, words: 18 },
    { day: 'Fri', minutes: 40, words: 22 },
    { day: 'Sat', minutes: 15, words: 6 },
    { day: 'Sun', minutes: 28, words: 14 }
  ];

  const topicProgress = [
    { topic: 'Business Communication', progress: 85, level: 'Advanced' },
    { topic: 'Travel English', progress: 92, level: 'Expert' },
    { topic: 'Academic Writing', progress: 68, level: 'Intermediate' },
    { topic: 'Conversation Skills', progress: 78, level: 'Advanced' },
    { topic: 'Grammar Fundamentals', progress: 95, level: 'Expert' }
  ];

  const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon name={icon} size={24} className={`text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${trend > 0 ? 'text-accent' : 'text-error'}`}>
            <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'accent';
    if (progress >= 70) return 'primary';
    if (progress >= 50) return 'secondary';
    return 'gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Learning Time"
          value={stats.totalLearningTime}
          subtitle="Since joining"
          icon="Clock"
          color="primary"
          trend={12}
        />
        <StatCard
          title="Words Learned"
          value={stats.wordsLearned.toLocaleString()}
          subtitle="Vocabulary mastered"
          icon="BookOpen"
          color="secondary"
          trend={8}
        />
        <StatCard
          title="Chats Completed"
          value={stats.chatsCompleted}
          subtitle="AI conversations"
          icon="MessageCircle"
          color="accent"
          trend={15}
        />
        <StatCard
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          subtitle="Keep it going!"
          icon="Flame"
          color="secondary"
          trend={5}
        />
      </div>

      {/* Account Information */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Account Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Member since:</span>
              <span className="font-medium text-text-primary">{formatDate(stats.accountCreated)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Grammar accuracy:</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-text-primary">{stats.grammarScore}%</span>
                <div className="w-16 h-2 bg-surface-200 rounded-full">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${stats.grammarScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Learning level:</span>
              <span className="font-medium text-primary capitalize">Intermediate</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Favorite topic:</span>
              <span className="font-medium text-text-primary">Business Communication</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Best streak:</span>
              <span className="font-medium text-text-primary">18 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Achievements:</span>
              <span className="font-medium text-text-primary">{achievementData.length} earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">This Week's Progress</h3>
        <div className="grid grid-cols-7 gap-2">
          {weeklyProgress.map((day, index) => (
            <div key={day.day} className="text-center">
              <div className="text-xs text-text-secondary mb-2">{day.day}</div>
              <div className="relative">
                <div className="w-full h-20 bg-surface-100 rounded-lg flex flex-col justify-end p-2">
                  <div 
                    className="bg-primary rounded transition-all duration-300"
                    style={{ height: `${(day.minutes / 40) * 100}%`, minHeight: '4px' }}
                  ></div>
                </div>
                <div className="text-xs font-medium text-text-primary mt-1">{day.minutes}m</div>
                <div className="text-xs text-text-secondary">{day.words} words</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            Total this week: <span className="font-medium text-text-primary">213 minutes</span> • 
            <span className="font-medium text-text-primary"> 95 new words</span>
          </p>
        </div>
      </div>

      {/* Topic Progress */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Learning Progress by Topic</h3>
        <div className="space-y-4">
          {topicProgress.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-text-primary">{topic.topic}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-${getProgressColor(topic.progress)}-100 text-${getProgressColor(topic.progress)}-700`}>
                    {topic.level}
                  </span>
                  <span className="text-sm font-medium text-text-primary">{topic.progress}%</span>
                </div>
              </div>
              <div className="w-full h-2 bg-surface-200 rounded-full">
                <div 
                  className={`h-full bg-${getProgressColor(topic.progress)} rounded-full transition-all duration-500`}
                  style={{ width: `${topic.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievementData.slice(0, 6).map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-surface-50 rounded-lg">
              <div className={`p-3 rounded-full bg-${achievement.color}-100`}>
                <Icon name={achievement.icon} size={20} className={`text-${achievement.color}-600`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{achievement.title}</h4>
                <p className="text-sm text-text-secondary">{achievement.description}</p>
                <p className="text-xs text-text-secondary mt-1">{formatDate(achievement.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Learning Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">Most Active Day</p>
                <p className="text-sm text-text-secondary">
                  You learn best on Fridays with an average of 35 minutes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={18} className="text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">Strength Area</p>
                <p className="text-sm text-text-secondary">
                  Grammar correction - 95% accuracy rate
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={18} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">Optimal Learning Time</p>
                <p className="text-sm text-text-secondary">
                  6:00 PM - 8:00 PM shows highest engagement
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="BookOpen" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">Focus Area</p>
                <p className="text-sm text-text-secondary">
                  Consider practicing Academic Writing more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;