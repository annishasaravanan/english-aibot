import React from 'react';
import Icon from 'components/AppIcon';

const FilterOptions = ({ selectedFilter, onFilterChange }) => {
  const filterOptions = [
    { id: 'all', label: 'All Words', icon: 'Grid3X3', count: 247 },
    { id: 'beginner', label: 'Beginner', icon: 'Star', count: 89 },
    { id: 'intermediate', label: 'Intermediate', icon: 'TrendingUp', count: 102 },
    { id: 'advanced', label: 'Advanced', icon: 'Zap', count: 56 },
    { id: 'learned', label: 'Learned', icon: 'CheckCircle', count: 168 },
    { id: 'review', label: 'Need Review', icon: 'RotateCcw', count: 23 }
  ];

  const categoryOptions = [
    { id: 'academic', label: 'Academic', icon: 'GraduationCap', count: 45 },
    { id: 'business', label: 'Business', icon: 'Briefcase', count: 32 },
    { id: 'literature', label: 'Literature', icon: 'BookOpen', count: 28 },
    { id: 'science', label: 'Science', icon: 'Microscope', count: 18 },
    { id: 'general', label: 'General', icon: 'Globe', count: 124 }
  ];

  return (
    <div className="space-y-4">
      {/* Quick Filters */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Filter by Level</h4>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === option.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-300' :'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-100'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === option.id
                  ? 'bg-primary-200 text-primary-800' :'bg-surface-200 text-text-secondary'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Filter by Category</h4>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === option.id
                  ? 'bg-secondary-100 text-secondary-700 border border-secondary-300' :'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-100'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === option.id
                  ? 'bg-secondary-200 text-secondary-800' :'bg-surface-200 text-text-secondary'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Display */}
      {selectedFilter !== 'all' && (
        <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Active Filter: {filterOptions.find(f => f.id === selectedFilter)?.label || 
                            categoryOptions.find(f => f.id === selectedFilter)?.label}
            </span>
          </div>
          <button
            onClick={() => onFilterChange('all')}
            className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <Icon name="X" size={12} />
            <span>Clear</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;