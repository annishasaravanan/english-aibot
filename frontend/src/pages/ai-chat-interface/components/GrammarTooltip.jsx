import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GrammarTooltip = ({ errors }) => {
  const [activeError, setActiveError] = useState(null);

  if (!errors || errors.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-10">
      <div className="bg-surface border border-border rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertCircle" size={16} className="text-warning" />
          <span className="text-sm font-medium text-text-primary">Grammar Suggestions</span>
        </div>
        
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="p-2 bg-warning-light rounded border border-warning/20 cursor-pointer hover:bg-warning/10 transition-colors duration-200"
              onClick={() => setActiveError(activeError === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-error line-through">{error.text}</span>
                  <Icon name="ArrowRight" size={12} className="text-text-secondary" />
                  <span className="text-sm text-accent font-medium">{error.correction}</span>
                </div>
                <Icon 
                  name={activeError === index ? "ChevronUp" : "ChevronDown"} 
                  size={14} 
                  className="text-text-secondary" 
                />
              </div>
              
              {activeError === index && (
                <div className="mt-2 pt-2 border-t border-warning/20">
                  <p className="text-xs text-text-secondary">{error.explanation}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Apply correction logic here
                      console.log('Apply correction:', error.correction);
                    }}
                    className="mt-2 text-xs text-primary hover:text-primary-600 transition-colors duration-200"
                  >
                    Apply correction
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-2 border-t border-border">
          <button
            onClick={() => {
              // Navigate to grammar tool
              console.log('Open grammar tool');
            }}
            className="text-xs text-primary hover:text-primary-600 transition-colors duration-200 flex items-center space-x-1"
          >
            <Icon name="ExternalLink" size={12} />
            <span>Open Grammar Tool</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrammarTooltip;