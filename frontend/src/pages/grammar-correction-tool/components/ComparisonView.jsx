import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ComparisonView = ({ originalText, correctedText, onClose }) => {
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' or 'unified'

  const getDifferences = () => {
    // Simple diff algorithm for demonstration
    const originalWords = originalText.split(' ');
    const correctedWords = correctedText.split(' ');
    const differences = [];
    
    let i = 0, j = 0;
    while (i < originalWords.length || j < correctedWords.length) {
      if (i >= originalWords.length) {
        differences.push({ type: 'added', text: correctedWords[j], index: j });
        j++;
      } else if (j >= correctedWords.length) {
        differences.push({ type: 'removed', text: originalWords[i], index: i });
        i++;
      } else if (originalWords[i] === correctedWords[j]) {
        differences.push({ type: 'unchanged', text: originalWords[i], index: i });
        i++;
        j++;
      } else {
        differences.push({ type: 'changed', original: originalWords[i], corrected: correctedWords[j], index: i });
        i++;
        j++;
      }
    }
    
    return differences;
  };

  const renderSideBySide = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Original Text */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="FileText" size={18} className="text-error" />
          <h4 className="font-medium text-text-primary">Original Text</h4>
          <span className="text-xs px-2 py-1 bg-error-light text-error-600 rounded-full">
            {originalText.split(' ').length} words
          </span>
        </div>
        <div className="p-4 bg-error-light border border-error-200 rounded-lg min-h-[200px]">
          <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
            {originalText}
          </p>
        </div>
      </div>

      {/* Corrected Text */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="CheckCircle" size={18} className="text-accent" />
          <h4 className="font-medium text-text-primary">Corrected Text</h4>
          <span className="text-xs px-2 py-1 bg-accent-light text-accent-600 rounded-full">
            {correctedText.split(' ').length} words
          </span>
        </div>
        <div className="p-4 bg-accent-light border border-accent-200 rounded-lg min-h-[200px]">
          <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
            {correctedText}
          </p>
        </div>
      </div>
    </div>
  );

  const renderUnified = () => {
    const differences = getDifferences();
    
    return (
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="GitCompare" size={18} className="text-primary-600" />
          <h4 className="font-medium text-text-primary">Unified Diff View</h4>
        </div>
        <div className="p-4 bg-surface border border-border rounded-lg min-h-[200px]">
          <div className="space-y-1 leading-relaxed">
            {differences.map((diff, index) => (
              <span key={index}>
                {diff.type === 'unchanged' && (
                  <span className="text-text-primary">{diff.text} </span>
                )}
                {diff.type === 'removed' && (
                  <span className="bg-error-light text-error-800 px-1 rounded line-through">
                    {diff.text}
                  </span>
                )}
                {diff.type === 'added' && (
                  <span className="bg-accent-light text-accent-800 px-1 rounded">
                    {diff.text}
                  </span>
                )}
                {diff.type === 'changed' && (
                  <>
                    <span className="bg-error-light text-error-800 px-1 rounded line-through mr-1">
                      {diff.original}
                    </span>
                    <span className="bg-accent-light text-accent-800 px-1 rounded">
                      {diff.corrected}
                    </span>
                  </>
                )}
                {' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="GitCompare" size={24} className="text-primary-600" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Before & After Comparison</h3>
            <p className="text-sm text-text-secondary">Review changes made to your text</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
        >
          <Icon name="X" size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm font-medium text-text-secondary">View:</span>
        <div className="flex bg-surface-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              viewMode === 'side-by-side' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              viewMode === 'unified'
                ? 'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Unified Diff
          </button>
        </div>
      </div>

      {/* Comparison Content */}
      {viewMode === 'side-by-side' ? renderSideBySide() : renderUnified()}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Legend</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error-light border border-error-200 rounded"></div>
            <span className="text-text-secondary">Original/Removed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent-light border border-accent-200 rounded"></div>
            <span className="text-text-secondary">Corrected/Added</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-surface border border-border rounded"></div>
            <span className="text-text-secondary">Unchanged</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-surface-50 rounded-lg">
          <div className="text-lg font-bold text-error">3</div>
          <div className="text-xs text-text-secondary">Corrections</div>
        </div>
        <div className="text-center p-3 bg-surface-50 rounded-lg">
          <div className="text-lg font-bold text-accent">+2</div>
          <div className="text-xs text-text-secondary">Words Added</div>
        </div>
        <div className="text-center p-3 bg-surface-50 rounded-lg">
          <div className="text-lg font-bold text-warning-600">+15</div>
          <div className="text-xs text-text-secondary">Readability</div>
        </div>
        <div className="text-center p-3 bg-surface-50 rounded-lg">
          <div className="text-lg font-bold text-primary-600">98%</div>
          <div className="text-xs text-text-secondary">Accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;