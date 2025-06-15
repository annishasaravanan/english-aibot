import React from 'react';
import Icon from 'components/AppIcon';

const EmotionMeter = ({ tone }) => {
  const toneConfig = {
    positive: {
      color: 'text-accent',
      bgColor: 'bg-accent-light',
      icon: 'Smile',
      label: 'Positive',
      description: 'Great conversation flow!'
    },
    encouraging: {
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      icon: 'TrendingUp',
      label: 'Encouraging',
      description: 'Keep up the good work!'
    },
    supportive: {
      color: 'text-secondary',
      bgColor: 'bg-secondary-50',
      icon: 'Heart',
      label: 'Supportive',
      description: 'Learning together'
    },
    neutral: {
      color: 'text-text-secondary',
      bgColor: 'bg-surface-100',
      icon: 'Minus',
      label: 'Neutral',
      description: 'Steady progress'
    }
  };

  const currentTone = toneConfig[tone] || toneConfig.neutral;

  return (
    <div className="flex items-center space-x-2">
      <div 
        className={`p-1.5 rounded-full ${currentTone.bgColor} transition-all duration-300`}
        title={currentTone.description}
      >
        <Icon 
          name={currentTone.icon} 
          size={14} 
          className={`${currentTone.color} transition-colors duration-300`} 
        />
      </div>
      
      <div className="hidden sm:block">
        <span className={`text-xs font-medium ${currentTone.color}`}>
          {currentTone.label}
        </span>
      </div>
    </div>
  );
};

export default EmotionMeter;