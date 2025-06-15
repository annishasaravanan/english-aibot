import React from 'react';
import Icon from 'components/AppIcon';

const QuickAccessButtons = ({ navigate }) => {
  const quickActions = [
    {
      title: "Start New Chat",
      description: "Begin a fresh conversation",
      icon: "MessageCirclePlus",
      color: "primary",
      route: "/ai-chat-interface",
      gradient: "from-primary to-primary-600"
    },
    {
      title: "Practice Vocabulary",
      description: "Learn new words & phrases",
      icon: "BookOpen",
      color: "accent",
      route: "/vocabulary-learning-hub",
      gradient: "from-accent to-accent-600"
    },
    {
      title: "Grammar Check",
      description: "Improve your writing",
      icon: "CheckCircle2",
      color: "secondary",
      route: "/grammar-correction-tool",
      gradient: "from-secondary to-secondary-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quickActions.map((action, index) => (
        <button
          key={index}
          onClick={() => navigate(action.route)}
          className="group card p-6 hover:shadow-lg transition-all duration-300 ease-gentle hover:-translate-y-1"
        >
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={action.icon} size={28} color="white" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
              {action.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {action.description}
            </p>
          </div>
          
          {/* Hover Arrow */}
          <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Icon name="ArrowRight" size={16} className="text-primary" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickAccessButtons;