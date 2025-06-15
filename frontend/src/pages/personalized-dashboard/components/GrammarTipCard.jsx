import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GrammarTipCard = ({ tip, onPractice }) => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="card p-6 hover:shadow-md transition-all duration-200 ease-gentle">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center">
          <Icon name="CheckCircle" size={20} className="text-secondary-600" />
        </div>
        <div>
          <h3 className="font-semibold text-text-primary">Grammar Tip</h3>
          <p className="text-xs text-text-secondary">Daily improvement</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">{tip.title}</h4>
        <p className="text-text-secondary text-sm mb-3">{tip.explanation}</p>

        <button
          onClick={() => setShowExample(!showExample)}
          className="flex items-center space-x-2 text-primary hover:text-primary-600 text-sm font-medium transition-colors duration-200"
        >
          <Icon name={showExample ? "ChevronUp" : "ChevronDown"} size={16} />
          <span>{showExample ? "Hide" : "Show"} Example</span>
        </button>

        {showExample && (
          <div className="mt-3 p-3 bg-surface-50 rounded-lg border border-border">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-text-primary font-medium">Correct:</p>
                  <p className="text-sm text-text-secondary">"{tip.example.correct}"</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="X" size={16} className="text-error mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-text-primary font-medium">Incorrect:</p>
                  <p className="text-sm text-text-secondary">"{tip.example.incorrect}"</p>
                </div>
              </div>
              <div className="mt-2 p-2 bg-primary-50 rounded border border-primary-200">
                <p className="text-xs text-primary-700">
                  <Icon name="Info" size={12} className="inline mr-1" />
                  {tip.example.reason}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onPractice}
        className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Icon name="Edit3" size={16} />
        <span>Practice Grammar</span>
      </button>
    </div>
  );
};

export default GrammarTipCard;