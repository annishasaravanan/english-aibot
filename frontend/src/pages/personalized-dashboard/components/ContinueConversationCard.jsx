import React from 'react';
import Icon from 'components/AppIcon';

const ContinueConversationCard = ({ conversation, onContinue }) => {
  return (
    <div className="card p-6 hover:shadow-md transition-all duration-200 ease-gentle">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
            <Icon name="MessageCircle" size={24} className="text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Continue Conversation</h3>
            <p className="text-sm text-text-secondary">{conversation.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="MessageSquare" size={16} />
          <span className="text-sm">{conversation.messagesCount} messages</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">Topic: {conversation.topic}</h4>
        <p className="text-text-secondary text-sm leading-relaxed">
          {conversation.preview}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-accent-600">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Ready to continue</span>
        </div>
        
        <button
          onClick={onContinue}
          className="btn-primary px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <span>Resume Chat</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ContinueConversationCard;