import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FlashcardComponent = ({ filter, onProgress, speechSynthesis }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState(new Set());
  const [reviewCards, setReviewCards] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock flashcard data
  const flashcards = [
  {
    id: 1,
    word: "Serendipity",
    pronunciation: "/ˌserənˈdipədē/",
    definition: "The occurrence and development of events by chance in a happy or beneficial way",
    synonyms: ["Fortune", "Luck", "Chance"],
    antonyms: ["Misfortune", "Bad luck"],
    example: `It was pure serendipity that led me to discover this amazing coffee shop while I was lost in the city.
The serendipity of meeting my future business partner at a random networking event changed my entire career path.`,
    difficulty: "advanced",
    category: "general",
    etymology: "From Persian fairy tale \'The Three Princes of Serendip'"
  },
  {
    id: 2,
    word: "Ubiquitous",
    pronunciation: "/yo͞oˈbikwədəs/",
    definition: "Present, appearing, or found everywhere",
    synonyms: ["Omnipresent", "Pervasive", "Universal"],
    antonyms: ["Rare", "Scarce", "Limited"],
    example: `Smartphones have become ubiquitous in modern society, with nearly everyone carrying one.
The ubiquitous presence of social media has transformed how we communicate and share information.`,
    difficulty: "intermediate",
    category: "academic",
    etymology: "From Latin \'ubique\' meaning \'everywhere'"
  },
  {
    id: 3,
    word: "Ephemeral",
    pronunciation: "/əˈfem(ə)rəl/",
    definition: "Lasting for a very short time",
    synonyms: ["Transient", "Fleeting", "Temporary"],
    antonyms: ["Permanent", "Lasting", "Enduring"],
    example: `The beauty of cherry blossoms is ephemeral, lasting only a few weeks each spring.
Social media trends are often ephemeral, gaining popularity quickly but fading just as fast.`,
    difficulty: "advanced",
    category: "literature",
    etymology: "From Greek \'ephemeros\' meaning \'lasting only a day'"
  },
  {
    id: 4,
    word: "Resilient",
    pronunciation: "/rəˈzilyənt/",
    definition: "Able to withstand or recover quickly from difficult conditions",
    synonyms: ["Strong", "Tough", "Adaptable"],
    antonyms: ["Fragile", "Weak", "Brittle"],
    example: `Children are remarkably resilient and can adapt to new situations much faster than adults.
The resilient ecosystem recovered quickly after the natural disaster, showing nature's incredible ability to heal.`,
    difficulty: "intermediate",
    category: "psychology",
    etymology: "From Latin \'resilire\' meaning \'to leap back'"
  },
  {
    id: 5,
    word: "Eloquent", pronunciation: "/ˈeləkwənt/", definition: "Fluent or persuasive in speaking or writing",
    synonyms: ["Articulate", "Persuasive", "Expressive"],
    antonyms: ["Inarticulate", "Tongue-tied", "Unclear"],
    example: `The speaker delivered an eloquent speech that moved the entire audience to tears.
Her eloquent writing style made even complex topics accessible to everyday readers.`,
    difficulty: "intermediate", category: "communication", etymology: "From Latin \'eloquens\' meaning \'speaking out'"
  }];


  const filteredCards = flashcards.filter((card) => {
    if (filter === 'all') return true;
    if (filter === 'beginner') return card.difficulty === 'beginner';
    if (filter === 'intermediate') return card.difficulty === 'intermediate';
    if (filter === 'advanced') return card.difficulty === 'advanced';
    if (filter === 'learned') return learnedCards.has(card.id);
    if (filter === 'review') return reviewCards.has(card.id);
    return card.category === filter;
  });

  const currentCard = filteredCards[currentCardIndex];

  useEffect(() => {
    // Calculate and update progress
    const totalCards = flashcards.length;
    const learned = learnedCards.size;
    const progress = Math.round(learned / totalCards * 100);
    onProgress(progress);
  }, [learnedCards, onProgress]);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleCardAction = (action) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (action === 'learned') {
      setLearnedCards((prev) => new Set([...prev, currentCard.id]));
      setReviewCards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentCard.id);
        return newSet;
      });
    } else if (action === 'review') {
      setReviewCards((prev) => new Set([...prev, currentCard.id]));
    }

    // Move to next card
    setTimeout(() => {
      if (currentCardIndex < filteredCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
      } else {
        setCurrentCardIndex(0);
      }
      setIsFlipped(false);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      if (currentCardIndex > 0) {
        setCurrentCardIndex((prev) => prev - 1);
      } else {
        setCurrentCardIndex(filteredCards.length - 1);
      }
      setIsFlipped(false);
      setIsAnimating(false);
    }, 200);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      if (currentCardIndex < filteredCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
      } else {
        setCurrentCardIndex(0);
      }
      setIsFlipped(false);
      setIsAnimating(false);
    }, 200);
  };

  const playPronunciation = () => {
    // Mock pronunciation - in real app would use Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentCard.word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center py-12">
        <Icon name="BookOpen" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No cards available</h3>
        <p className="text-text-secondary">Try adjusting your filter settings</p>
      </div>);

  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Card Counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-text-secondary">
          Card {currentCardIndex + 1} of {filteredCards.length}
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={16} className="text-accent-600" />
            <span className="text-accent-700 font-medium">{learnedCards.size} learned</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RotateCcw" size={16} className="text-warning-600" />
            <span className="text-warning-700 font-medium">{reviewCards.size} review</span>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative mb-8">
        <div
          className={`relative w-full h-80 sm:h-96 cursor-pointer transition-transform duration-500 ease-gentle ${
          isAnimating ? 'scale-95' : 'scale-100'}`
          }
          onClick={handleFlip}
          style={{ perspective: '1000px' }}>

          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-gentle ${
            isFlipped ? 'rotate-y-180' : ''}`
            }
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>

            {/* Front of card */}
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-lg"
              style={{ backfaceVisibility: 'hidden' }}>

              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                currentCard.difficulty === 'beginner' ? 'bg-accent-100 text-accent-700' :
                currentCard.difficulty === 'intermediate' ? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'}`
                }>
                  {currentCard.difficulty}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
                {currentCard.word}
              </h2>
              
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-text-secondary font-mono text-lg">
                  {currentCard.pronunciation}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation();
                  }}
                  className="p-2 rounded-full hover:bg-primary-100 transition-colors duration-200">

                  <Icon name="Volume2" size={20} className="text-primary-600" />
                </button>
              </div>

              <div className="text-text-secondary mb-6">
                <Icon name="RotateCcw" size={20} className="mx-auto mb-2" />
                <p className="text-sm">Tap to see definition</p>
              </div>

              <div className="text-xs text-text-secondary bg-surface-100 px-3 py-1 rounded-full">
                {currentCard.category}
              </div>
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-surface to-surface-50 border-2 border-border rounded-2xl p-6 shadow-lg overflow-y-auto"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Definition</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {currentCard.definition}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Examples</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    {currentCard.example.split('\n').map((example, index) =>
                    <p key={index} className="italic leading-relaxed">
                        "{example.trim()}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-2">Synonyms</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentCard.synonyms.map((synonym, index) =>
                      <span key={index} className="px-2 py-1 bg-accent-100 text-accent-700 rounded text-xs">
                          {synonym}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-2">Antonyms</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentCard.antonyms.map((antonym, index) =>
                      <span key={index} className="px-2 py-1 bg-error-100 text-error-700 rounded text-xs">
                          {antonym}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-text-secondary">
                    <strong>Etymology:</strong> {currentCard.etymology}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center shadow-md hover:bg-surface-100 transition-colors duration-200 disabled:opacity-50">

          <Icon name="ChevronLeft" size={20} className="text-text-secondary" />
        </button>
        
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center shadow-md hover:bg-surface-100 transition-colors duration-200 disabled:opacity-50">

          <Icon name="ChevronRight" size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleCardAction('review')}
          disabled={isAnimating}
          className="flex items-center space-x-2 px-6 py-3 bg-warning-100 text-warning-700 rounded-lg hover:bg-warning-200 transition-colors duration-200 disabled:opacity-50">

          <Icon name="RotateCcw" size={18} />
          <span className="font-medium">Need Review</span>
        </button>
        
        <button
          onClick={() => handleCardAction('learned')}
          disabled={isAnimating}
          className="flex items-center space-x-2 px-6 py-3 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-colors duration-200 disabled:opacity-50">

          <Icon name="CheckCircle" size={18} />
          <span className="font-medium">Got It!</span>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Session Progress</span>
          <span className="text-sm text-text-secondary">
            {Math.round((currentCardIndex + 1) / filteredCards.length * 100)}%
          </span>
        </div>
        <div className="progress-indicator h-2">
          <div
            className="progress-bar rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentCardIndex + 1) / filteredCards.length * 100}%` }}>
          </div>
        </div>
      </div>
    </div>);

};

export default FlashcardComponent;