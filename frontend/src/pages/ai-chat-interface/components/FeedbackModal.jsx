import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FeedbackModal = ({ messageId, onSubmit, onClose }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [selectedReasons, setSelectedReasons] = useState([]);

  const feedbackReasons = [
    { id: 'helpful', label: 'Very helpful', icon: 'ThumbsUp' },
    { id: 'accurate', label: 'Accurate correction', icon: 'CheckCircle' },
    { id: 'clear', label: 'Clear explanation', icon: 'MessageCircle' },
    { id: 'confusing', label: 'Confusing', icon: 'HelpCircle' },
    { id: 'incorrect', label: 'Incorrect', icon: 'X' },
    { id: 'irrelevant', label: 'Not relevant', icon: 'Minus' }
  ];

  const handleReasonToggle = (reasonId) => {
    setSelectedReasons(prev => 
      prev.includes(reasonId)
        ? prev.filter(id => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const handleSubmit = () => {
    if (!rating) return;
    
    onSubmit(messageId, rating, {
      comment: comment.trim(),
      reasons: selectedReasons
    });
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Feedback</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              How was this response?
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setRating('up')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  rating === 'up' ?'border-accent bg-accent-light text-accent' :'border-border hover:border-accent/50'
                }`}
              >
                <Icon name="ThumbsUp" size={16} />
                <span className="text-sm">Helpful</span>
              </button>
              
              <button
                onClick={() => setRating('down')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  rating === 'down'
                    ? 'border-error bg-error-light text-error' :'border-border hover:border-error/50'
                }`}
              >
                <Icon name="ThumbsDown" size={16} />
                <span className="text-sm">Not helpful</span>
              </button>
            </div>
          </div>

          {/* Reasons */}
          {rating && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                What made it {rating === 'up' ? 'helpful' : 'unhelpful'}? (Optional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {feedbackReasons
                  .filter(reason => 
                    rating === 'up' 
                      ? ['helpful', 'accurate', 'clear'].includes(reason.id)
                      : ['confusing', 'incorrect', 'irrelevant'].includes(reason.id)
                  )
                  .map(reason => (
                    <button
                      key={reason.id}
                      onClick={() => handleReasonToggle(reason.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-left transition-all duration-200 ${
                        selectedReasons.includes(reason.id)
                          ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon name={reason.icon} size={14} />
                      <span className="text-sm">{reason.label}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Comment */}
          {rating && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Additional comments (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="w-full px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                rows={3}
                maxLength={500}
              />
              <div className="text-xs text-text-secondary mt-1">
                {comment.length}/500 characters
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!rating}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              rating
                ? 'bg-primary text-white hover:bg-primary-600' :'bg-surface-200 text-text-secondary cursor-not-allowed'
            }`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;