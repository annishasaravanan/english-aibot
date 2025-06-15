import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DailyVocabularyCard = ({ vocabulary, onPractice }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card p-6 hover:shadow-md transition-all duration-200 ease-gentle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} className="text-accent-600" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Word of the Day</h3>
            <span className="text-xs px-2 py-1 bg-accent-100 text-accent-700 rounded-full">
              {vocabulary.difficulty}
            </span>
          </div>
        </div>
        <button
          onClick={handleFlip}
          className="p-2 hover:bg-surface-100 rounded-lg transition-colors duration-200"
        >
          <Icon name="RotateCcw" size={16} className="text-text-secondary" />
        </button>
      </div>

      <div className="mb-4">
        {!isFlipped ? (
          <div className="text-center py-4">
            <h4 className="text-2xl font-bold text-text-primary mb-2">
              {vocabulary.word}
            </h4>
            <p className="text-text-secondary text-sm mb-3">
              {vocabulary.pronunciation}
            </p>
            <button
              onClick={handleFlip}
              className="text-primary hover:text-primary-600 text-sm font-medium"
            >
              Tap to see meaning →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-text-primary mb-1">Meaning:</h5>
              <p className="text-text-secondary text-sm">{vocabulary.meaning}</p>
            </div>
            <div>
              <h5 className="font-medium text-text-primary mb-1">Example:</h5>
              <p className="text-text-secondary text-sm italic">"{vocabulary.example}"</p>
            </div>
            <div>
              <h5 className="font-medium text-text-primary mb-1">Synonyms:</h5>
              <div className="flex flex-wrap gap-2">
                {vocabulary.synonyms.map((synonym, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-surface-100 text-text-secondary text-xs rounded"
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onPractice}
        className="w-full bg-accent text-white py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Icon name="Play" size={16} />
        <span>Practice More Words</span>
      </button>
    </div>
  );
};

export default DailyVocabularyCard;