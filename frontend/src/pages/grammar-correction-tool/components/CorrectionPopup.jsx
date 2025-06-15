import React from 'react';
import Icon from 'components/AppIcon';

const CorrectionPopup = ({ error, onApply, onClose }) => {
  const getErrorTypeColor = (type) => {
    switch (type) {
      case 'grammar': return 'border-red-500 bg-red-50';
      case 'spelling': return 'border-red-400 bg-red-50';
      case 'style': return 'border-orange-400 bg-orange-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getErrorIcon = (type) => {
    switch (type) {
      case 'grammar': return 'AlertCircle';
      case 'spelling': return 'Type';
      case 'style': return 'Palette';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-surface rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${getErrorTypeColor(error.type)}`}>
              <Icon name={getErrorIcon(error.type)} size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary capitalize">
                {error.type} Issue
              </h3>
              <p className="text-sm text-text-secondary">{error.rule}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Original vs Suggestion */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">
                Original Text
              </label>
              <div className="p-3 bg-error-light border border-error-200 rounded-lg">
                <span className="text-error-800 font-medium">"{error.text}"</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Icon name="ArrowDown" size={20} className="text-text-tertiary" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary mb-2 block">
                Suggested Correction
              </label>
              <div className="p-3 bg-accent-light border border-accent-200 rounded-lg">
                <span className="text-accent-800 font-medium">"{error.suggestion}"</span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <label className="text-sm font-medium text-text-secondary mb-2 block">
              Explanation
            </label>
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-text-primary leading-relaxed">
                {error.explanation}
              </p>
            </div>
          </div>

          {/* Grammar Rule */}
          <div className="mb-6">
            <div className="flex items-start space-x-3 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <Icon name="BookOpen" size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-primary-800 mb-1">Grammar Rule</h4>
                <p className="text-sm text-primary-700">{error.rule}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onApply}
              className="flex-1 btn-primary py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <Icon name="Check" size={18} />
              <span>Apply Correction</span>
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-3 border border-border rounded-lg font-medium text-text-primary hover:bg-surface-100 transition-colors duration-200"
            >
              Ignore
            </button>
          </div>
        </div>

        {/* Additional Tips */}
        <div className="px-6 pb-6">
          <div className="bg-surface-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={18} className="text-warning-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-1">Pro Tip</h4>
                <p className="text-sm text-text-secondary">
                  {error.type === 'grammar' && "Practice this grammar rule with our interactive exercises to avoid similar mistakes."}
                  {error.type === 'spelling' && "Add this word to your vocabulary practice list to remember the correct spelling."}
                  {error.type === 'style' && "Using varied vocabulary makes your writing more engaging and professional."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectionPopup;