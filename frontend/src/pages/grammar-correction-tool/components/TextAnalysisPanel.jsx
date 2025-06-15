import React from 'react';
import Icon from 'components/AppIcon';

const TextAnalysisPanel = ({ analysisResults, isAnalyzing, errors, onErrorClick }) => {
  const getErrorIcon = (type) => {
    switch (type) {
      case 'grammar': return 'AlertCircle';
      case 'spelling': return 'Type';
      case 'style': return 'Palette';
      default: return 'AlertCircle';
    }
  };

  const getErrorColor = (type) => {
    switch (type) {
      case 'grammar': return 'text-red-600 bg-red-50 border-red-200';
      case 'spelling': return 'text-red-500 bg-red-50 border-red-200';
      case 'style': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getReadabilityColor = (score) => {
    if (score >= 80) return 'text-accent-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">Analysis Overview</h3>
        </div>

        {isAnalyzing ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-surface-200 rounded mb-2"></div>
                <div className="h-3 bg-surface-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : analysisResults ? (
          <div className="space-y-4">
            {/* Readability Score */}
            <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">Readability</span>
              </div>
              <span className={`text-sm font-bold ${getReadabilityColor(analysisResults.readabilityScore)}`}>
                {analysisResults.readabilityScore}/100
              </span>
            </div>

            {/* Error Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-error-light rounded-lg">
                <div className="text-2xl font-bold text-error">{analysisResults.grammarErrors}</div>
                <div className="text-xs text-error-600">Grammar</div>
              </div>
              <div className="text-center p-3 bg-error-light rounded-lg">
                <div className="text-2xl font-bold text-error">{analysisResults.spellingErrors}</div>
                <div className="text-xs text-error-600">Spelling</div>
              </div>
            </div>

            {/* Style Improvements */}
            <div className="p-3 bg-warning-light rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-warning-800">Style Suggestions</span>
                <span className="text-sm font-bold text-warning-600">{analysisResults.styleImprovements}</span>
              </div>
            </div>

            {/* Document Stats */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Words</span>
                <span className="text-text-primary font-medium">{analysisResults.wordCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Characters</span>
                <span className="text-text-primary font-medium">{analysisResults.characterCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Reading Time</span>
                <span className="text-text-primary font-medium">{analysisResults.readingTime}</span>
              </div>
            </div>

            {/* Tone Analysis */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tone</span>
                <span className="text-text-primary font-medium">{analysisResults.toneAnalysis}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Formality</span>
                <span className="text-text-primary font-medium">{analysisResults.formalityLevel}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-secondary">Start typing to see analysis</p>
          </div>
        )}
      </div>

      {/* Error Details */}
      {errors.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h3 className="text-lg font-semibold text-text-primary">Issues Found</h3>
          </div>

          <div className="space-y-3">
            {errors.map((error) => (
              <button
                key={error.id}
                onClick={() => onErrorClick(error)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${getErrorColor(error.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon name={getErrorIcon(error.type)} size={16} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium capitalize">{error.type}</span>
                      <span className="text-xs px-2 py-0.5 bg-white rounded-full opacity-75">
                        {error.rule}
                      </span>
                    </div>
                    <p className="text-sm opacity-90 mb-1">
                      "{error.text}" → "{error.suggestion}"
                    </p>
                    <p className="text-xs opacity-75 line-clamp-2">
                      {error.explanation}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="opacity-50" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-surface-50 transition-colors duration-200">
            <Icon name="Lightbulb" size={20} className="text-warning-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-text-primary">Writing Tips</div>
              <div className="text-xs text-text-secondary">Get personalized suggestions</div>
            </div>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-surface-50 transition-colors duration-200">
            <Icon name="BookOpen" size={20} className="text-primary-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-text-primary">Grammar Rules</div>
              <div className="text-xs text-text-secondary">Learn grammar concepts</div>
            </div>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-surface-50 transition-colors duration-200">
            <Icon name="TrendingUp" size={20} className="text-accent-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-text-primary">Progress Tracking</div>
              <div className="text-xs text-text-secondary">View improvement stats</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextAnalysisPanel;