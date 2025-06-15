import React from 'react';
import Icon from 'components/AppIcon';

const ProgressTrackingCard = ({ progress, userLevel }) => {
  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-accent';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-accent-100';
    if (score >= 75) return 'bg-primary-100';
    if (score >= 60) return 'bg-warning-light';
    return 'bg-error-light';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Weekly Progress</h3>
            <p className="text-xs text-text-secondary">Keep up the great work!</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-text-primary">{userLevel}</p>
          <p className="text-xs text-text-secondary">Current Level</p>
        </div>
      </div>

      {/* Progress Circles */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Words Learned Progress */}
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-surface-200"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${getProgressPercentage(progress.wordsLearned, progress.target) * 1.76} 176`}
                className="text-accent transition-all duration-500 ease-gentle"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-text-primary">
                {progress.wordsLearned}
              </span>
            </div>
          </div>
          <p className="text-xs text-text-secondary">Words Learned</p>
          <p className="text-xs text-accent font-medium">
            {progress.wordsLearned}/{progress.target}
          </p>
        </div>

        {/* Chat Completion Progress */}
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-surface-200"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(progress.chatsCompleted / 10) * 176} 176`}
                className="text-primary transition-all duration-500 ease-gentle"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-text-primary">
                {progress.chatsCompleted}
              </span>
            </div>
          </div>
          <p className="text-xs text-text-secondary">Chats This Week</p>
          <p className="text-xs text-primary font-medium">
            {progress.chatsCompleted}/10 goal
          </p>
        </div>
      </div>

      {/* Grammar Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Grammar Score</span>
          <span className={`text-sm font-bold ${getScoreColor(progress.grammarScore)}`}>
            {progress.grammarScore}%
          </span>
        </div>
        <div className="w-full bg-surface-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ease-gentle ${
              progress.grammarScore >= 90 ? 'bg-accent' :
              progress.grammarScore >= 75 ? 'bg-primary' :
              progress.grammarScore >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${progress.grammarScore}%` }}
          ></div>
        </div>
      </div>

      {/* Streak Badge */}
      <div className={`p-3 rounded-lg ${getScoreBgColor(progress.grammarScore)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Flame" size={16} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">
              {progress.streakDays} Day Streak
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < progress.streakDays ? 'bg-accent' : 'bg-surface-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingCard;