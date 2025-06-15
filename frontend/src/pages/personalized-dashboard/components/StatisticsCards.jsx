import React from 'react';
import Icon from 'components/AppIcon';

const StatisticsCards = ({ stats, weeklyProgress }) => {
  const statisticsData = [
    {
      title: "Total Words",
      value: stats.totalWordsLearned.toLocaleString(),
      icon: "BookOpen",
      color: "accent",
      change: "+23 this week",
      changeType: "positive"
    },
    {
      title: "Chat Sessions",
      value: stats.totalChatsCompleted.toString(),
      icon: "MessageCircle",
      color: "primary",
      change: "+8 this week",
      changeType: "positive"
    },
    {
      title: "Average Score",
      value: `${stats.averageGrammarScore}%`,
      icon: "Target",
      color: "secondary",
      change: "+3% this week",
      changeType: "positive"
    },
    {
      title: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: "Flame",
      color: "warning",
      change: `Best: ${stats.longestStreak} days`,
      changeType: "neutral"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      accent: {
        bg: "bg-accent-100",
        text: "text-accent-600",
        icon: "text-accent"
      },
      primary: {
        bg: "bg-primary-100",
        text: "text-primary-600",
        icon: "text-primary"
      },
      secondary: {
        bg: "bg-secondary-100",
        text: "text-secondary-600",
        icon: "text-secondary"
      },
      warning: {
        bg: "bg-warning-light",
        text: "text-warning",
        icon: "text-warning"
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary">Learning Statistics</h3>
        <button className="text-text-secondary hover:text-text-primary transition-colors duration-200">
          <Icon name="MoreHorizontal" size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {statisticsData.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          
          return (
            <div key={index} className="card p-4 hover:shadow-md transition-all duration-200 ease-gentle">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <Icon name={stat.icon} size={20} className={colors.icon} />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">{stat.title}</p>
                    <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 ${
                    stat.changeType === 'positive' ? 'text-accent' :
                    stat.changeType === 'negative' ? 'text-error' : 'text-text-secondary'
                  }`}>
                    {stat.changeType === 'positive' && <Icon name="TrendingUp" size={12} />}
                    {stat.changeType === 'negative' && <Icon name="TrendingDown" size={12} />}
                    <span className="text-xs font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Goal Progress */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-text-primary">Weekly Goals</h4>
          <span className="text-xs text-text-secondary">
            {Math.round((weeklyProgress.wordsLearned / weeklyProgress.target) * 100)}% complete
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Learn 30 new words</span>
            <span className="font-medium text-text-primary">
              {weeklyProgress.wordsLearned}/{weeklyProgress.target}
            </span>
          </div>
          <div className="w-full bg-surface-200 rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-500 ease-gentle"
              style={{ width: `${(weeklyProgress.wordsLearned / weeklyProgress.target) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} className="text-text-secondary" />
              <span className="text-text-secondary">This week</span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-accent font-medium">
                {weeklyProgress.chatsCompleted} chats
              </span>
              <span className="text-primary font-medium">
                {weeklyProgress.grammarScore}% accuracy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;