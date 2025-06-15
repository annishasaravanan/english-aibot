import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const VocabularyQuiz = ({ filter, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState('mixed');

  // Mock quiz data
  const quizTypes = [
    { id: 'mixed', name: 'Mixed Quiz', icon: 'Shuffle', description: 'Various question types' },
    { id: 'mcq', name: 'Multiple Choice', icon: 'CheckSquare', description: 'Choose the correct answer' },
    { id: 'fillblanks', name: 'Fill in Blanks', icon: 'Edit3', description: 'Complete the sentences' },
    { id: 'matching', name: 'Matching', icon: 'Link', description: 'Match words with definitions' }
  ];

  const quizQuestions = [
    {
      id: 1,
      type: 'mcq',
      question: "What does \'ubiquitous\' mean?",
      options: [
        "Rare and hard to find",
        "Present everywhere",
        "Extremely expensive",
        "Difficult to understand"
      ],
      correct: 1,
      explanation: "'Ubiquitous\' means present, appearing, or found everywhere. It comes from Latin \'ubique\' meaning \'everywhere\'.",
      difficulty: "intermediate"
    },
    {
      id: 2,
      type: 'fillblanks',
      question: "The _______ beauty of cherry blossoms lasts only a few weeks each spring.",
      options: ["ephemeral", "eternal", "artificial", "magnificent"],
      correct: 0,
      explanation: "'Ephemeral\' means lasting for a very short time, which perfectly describes the brief blooming period of cherry blossoms.",
      difficulty: "advanced"
    },
    {
      id: 3,
      type: 'mcq',
      question: "Which word is a synonym for \'resilient\'?",
      options: ["Fragile", "Adaptable", "Rigid", "Temporary"],
      correct: 1,
      explanation: "'Resilient\' means able to recover quickly from difficulties, making \'adaptable\' the best synonym.",
      difficulty: "intermediate"
    },
    {
      id: 4,
      type: 'matching',
      question: "Match the word \'serendipity\' with its correct definition:",
      options: [
        "A planned discovery",
        "A fortunate accident",
        "A scientific method",
        "A travel destination"
      ],
      correct: 1,
      explanation: "'Serendipity\' refers to a pleasant surprise or fortunate accident - finding something good while looking for something else.",
      difficulty: "advanced"
    },
    {
      id: 5,
      type: 'mcq',
      question: "An \'eloquent\' speaker is:",
      options: [
        "Very quiet and reserved",
        "Fluent and persuasive",
        "Loud and aggressive",
        "Confused and unclear"
      ],
      correct: 1,
      explanation: "'Eloquent\' describes someone who speaks or writes in a fluent, persuasive, and expressive manner.",
      difficulty: "intermediate"
    },
    {
      id: 6,
      type: 'fillblanks',
      question: "The detective\'s _______ analysis helped solve the complex case quickly.",
      options: ["perspicacious", "superficial", "random", "delayed"],
      correct: 0,
      explanation: "'Perspicacious\' means having keen insight and understanding, perfect for describing sharp analytical skills.",
      difficulty: "advanced"
    },
    {
      id: 7,
      type: 'mcq',
      question: "What is the opposite of \'ephemeral\'?",
      options: ["Temporary", "Brief", "Permanent", "Quick"],
      correct: 2,
      explanation: "'Ephemeral\' means short-lived or temporary, so \'permanent\' is its direct opposite.",
      difficulty: "intermediate"
    },
    {
      id: 8,
      type: 'matching',
      question: "Which context best fits the word \'ubiquitous\'?",
      options: [
        "Describing a rare gemstone",
        "Talking about smartphone usage",
        "Discussing a secret location",
        "Explaining a complex theory"
      ],
      correct: 1,
      explanation: "Smartphones are ubiquitous in modern society - they\'re found everywhere and used by almost everyone.",
      difficulty: "intermediate"
    }
  ];

  const filteredQuestions = quizQuestions.filter(question => {
    if (filter === 'all') return true;
    if (filter === 'beginner') return question.difficulty === 'beginner';
    if (filter === 'intermediate') return question.difficulty === 'intermediate';
    if (filter === 'advanced') return question.difficulty === 'advanced';
    if (selectedQuizType !== 'mixed') return question.type === selectedQuizType;
    return true;
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const totalQuestions = filteredQuestions.length;

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResults]);

  // Calculate score when showing results
  useEffect(() => {
    if (showResults) {
      const correctAnswers = filteredQuestions.filter(
        (question, index) => userAnswers[index] === question.correct
      ).length;
      const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
      setScore(finalScore);
      onComplete(finalScore);
    }
  }, [showResults, userAnswers, filteredQuestions, totalQuestions, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(300);
  };

  const handleAnswerSelect = (answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(300);
  };

  // Quiz selection screen
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl p-8 text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Brain" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Vocabulary Quiz</h2>
          <p className="text-text-secondary mb-6">
            Test your vocabulary knowledge with our interactive quiz
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {quizTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedQuizType(type.id)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                  selectedQuizType === type.id
                    ? 'bg-primary-50 border-primary-300 text-primary-700' :'bg-surface border-border hover:bg-surface-100 text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name={type.icon} size={20} />
                  <span className="font-medium">{type.name}</span>
                </div>
                <p className="text-sm opacity-75">{type.description}</p>
              </button>
            ))}
          </div>

          <div className="bg-surface border border-border rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">{totalQuestions}</div>
                <div className="text-sm text-text-secondary">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning-600">5:00</div>
                <div className="text-sm text-text-secondary">Time Limit</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-600">100</div>
                <div className="text-sm text-text-secondary">Max Score</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const correctAnswers = filteredQuestions.filter(
      (question, index) => userAnswers[index] === question.correct
    ).length;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              score >= 80 ? 'bg-gradient-to-br from-accent-400 to-accent-600' :
              score >= 60 ? 'bg-gradient-to-br from-warning-400 to-warning-600': 'bg-gradient-to-br from-error-400 to-error-600'
            }`}>
              <Icon 
                name={score >= 80 ? "Trophy" : score >= 60 ? "Award" : "Target"} 
                size={32} 
                color="white" 
              />
            </div>
            
            <h2 className="text-2xl font-bold text-text-primary mb-2">Quiz Complete!</h2>
            <div className="text-4xl font-bold text-primary-600 mb-2">{score}%</div>
            <p className="text-text-secondary">
              You got {correctAnswers} out of {totalQuestions} questions correct
            </p>
          </div>

          {/* Performance Breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-accent-50 rounded-lg">
              <div className="text-xl font-bold text-accent-600">{correctAnswers}</div>
              <div className="text-sm text-accent-700">Correct</div>
            </div>
            <div className="text-center p-4 bg-error-50 rounded-lg">
              <div className="text-xl font-bold text-error-600">{totalQuestions - correctAnswers}</div>
              <div className="text-sm text-error-700">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-xl font-bold text-primary-600">{formatTime(300 - timeLeft)}</div>
              <div className="text-sm text-primary-700">Time Used</div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {filteredQuestions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className={`p-4 rounded-lg border ${
                  isCorrect ? 'bg-accent-50 border-accent-200' : 'bg-error-50 border-error-200'
                }`}>
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={isCorrect ? "CheckCircle" : "XCircle"} 
                      size={20} 
                      className={isCorrect ? "text-accent-600" : "text-error-600"} 
                    />
                    <div className="flex-1">
                      <p className="font-medium text-text-primary mb-1">
                        {question.question}
                      </p>
                      <p className={`text-sm ${isCorrect ? 'text-accent-700' : 'text-error-700'}`}>
                        Your answer: {question.options[userAnswer] || 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-accent-700 mt-1">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-xs text-text-secondary mt-2 italic">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-100 transition-colors duration-200"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => {
                // Navigate to flashcards or other learning activity
                console.log('Continue learning');
              }}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question screen
  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-surface border border-border rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-text-primary">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentQuestion.difficulty === 'beginner' ? 'bg-accent-100 text-accent-700' :
              currentQuestion.difficulty === 'intermediate'? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
            timeLeft <= 60 ? 'bg-error-100 text-error-700' : 'bg-surface-100 text-text-secondary'
          }`}>
            <Icon name="Clock" size={16} />
            <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="progress-indicator h-2">
          <div 
            className="progress-bar rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon 
            name={
              currentQuestion.type === 'mcq' ? 'CheckSquare' :
              currentQuestion.type === 'fillblanks'? 'Edit3' : 'Link'
            } 
            size={20} 
            className="text-primary-600" 
          />
          <span className="text-sm font-medium text-primary-600 capitalize">
            {currentQuestion.type === 'mcq' ? 'Multiple Choice' :
             currentQuestion.type === 'fillblanks'? 'Fill in the Blank' : 'Matching'}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                userAnswers[currentQuestionIndex] === index
                  ? 'bg-primary-50 border-primary-300 text-primary-700' :'bg-surface-50 border-border hover:bg-surface-100 text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  userAnswers[currentQuestionIndex] === index
                    ? 'border-primary-500 bg-primary-500' :'border-border'
                }`}>
                  {userAnswers[currentQuestionIndex] === index && (
                    <Icon name="Check" size={14} color="white" />
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronLeft" size={18} />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={userAnswers[currentQuestionIndex] === undefined}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}</span>
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>
  );
};

export default VocabularyQuiz;