import React from 'react';
import Icon from 'components/AppIcon';

const WelcomeSection = ({ greeting, userName, level, streak }) => {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {greeting}, {userName}! 👋
              </h1>
              <p className="text-primary-100 text-lg">
                Ready to continue your English learning journey?
              </p>
            </div>
            
            <div className="flex items-center space-x-4 ml-4">
              {/* Level Badge */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <Icon name="Award" size={16} />
                  <span className="text-sm font-medium">Level</span>
                </div>
                <p className="text-sm font-bold">{level}</p>
              </div>

              {/* Streak Badge */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <Icon name="Flame" size={16} />
                  <span className="text-sm font-medium">Streak</span>
                </div>
                <p className="text-sm font-bold">{streak} days</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="flex items-center space-x-6 text-primary-100">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span className="text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} />
              <span className="text-sm">Daily Goal: 30 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;