import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ChatMessage = ({ message, onFeedback, speechSynthesis }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const renderMessageContent = () => {
    if (message.grammarErrors && message.grammarErrors.length > 0) {
      let content = message.content;
      let offset = 0;

      message.grammarErrors.forEach((error) => {
        const start = error.position.start + offset;
        const end = error.position.end + offset;
        const errorText = content.substring(start, end);
        const replacement = `<span class="grammar-error" title="${error.explanation}">${errorText}</span>`;

        content = content.substring(0, start) + replacement + content.substring(end);
        offset += replacement.length - errorText.length;
      });

      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    return <p className="whitespace-pre-wrap">{message.content}</p>;
  };

  if (message.type === 'user') {
    return (
      <div className="flex items-start justify-end space-x-3">
        <div className="flex flex-col items-end max-w-xs sm:max-w-sm md:max-w-md">
          <div className="conversation-bubble conversation-bubble-user">
            {renderMessageContent()}
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-text-secondary">{formatTime(message.timestamp)}</span>
            <Icon name="Check" size={12} className="text-primary" />
          </div>
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      </div>);

  }

  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
        <Icon name="Bot" size={16} color="white" />
      </div>
      
      <div className="flex flex-col max-w-xs sm:max-w-sm md:max-w-md">
        <div className="conversation-bubble conversation-bubble-ai">
          {renderMessageContent()}
          
          {/* Message Actions */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
            <div className="flex items-center space-x-2">
              {message.hasAudio &&
              <button
                onClick={handlePlayAudio}
                className="p-1 rounded hover:bg-surface-100 transition-colors duration-200"
                title="Play audio">

                  <Icon
                  name={isPlaying ? "Pause" : "Play"}
                  size={14}
                  className="text-text-secondary" />

                </button>
              }
              
              <button
                onClick={() => navigator.clipboard.writeText(message.content)}
                className="p-1 rounded hover:bg-surface-100 transition-colors duration-200"
                title="Copy message">

                <Icon name="Copy" size={14} className="text-text-secondary" />
              </button>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onFeedback('up')}
                className={`p-1 rounded hover:bg-surface-100 transition-colors duration-200 ${
                message.feedback?.rating === 'up' ? 'text-accent' : 'text-text-secondary'}`
                }
                title="Helpful">

                <Icon name="ThumbsUp" size={14} />
              </button>
              
              <button
                onClick={() => onFeedback('down')}
                className={`p-1 rounded hover:bg-surface-100 transition-colors duration-200 ${
                message.feedback?.rating === 'down' ? 'text-error' : 'text-text-secondary'}`
                }
                title="Not helpful">

                <Icon name="ThumbsDown" size={14} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-text-secondary">{formatTime(message.timestamp)}</span>
          {message.feedback?.comment &&
          <Icon name="MessageCircle" size={12} className="text-accent" title="Has feedback" />
          }
        </div>
      </div>
    </div>);

};

export default ChatMessage;