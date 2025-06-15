import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const DailyWordChallenge = ({ onComplete, speechSynthesis }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock daily word challenge data
  const dailyChallenge = {
    date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    word: "Perspicacious",
    pronunciation: "/ˌpərspəˈkāSHəs/",
    definition: "Having a ready insight into and understanding of things; mentally sharp or keen",
    etymology: "From Latin \'perspicax\' meaning \'sharp-sighted'",
    difficulty: "advanced",
    category: "intellectual",
    examples: [
    "The perspicacious detective quickly identified the key clue that others had missed.",
    "Her perspicacious analysis of the market trends helped the company avoid significant losses.",
    "The professor's perspicacious observations about human behavior made his lectures fascinating."],

    synonyms: ["Astute", "Perceptive", "Insightful", "Sharp", "Keen"],
    antonyms: ["Obtuse", "Dull", "Unperceptive", "Slow"],
    challenges: [
    {
      type: "pronunciation",
      question: "How is \'perspicacious\' pronounced?",
      options: [
      "/ˌpərspəˈkāSHəs/",
      "/ˌpərˈspikāSHəs/",
      "/ˌprespəˈkāSHəs/",
      "/ˌpərspəˈkāsəs/"],

      correct: 0
    },
    {
      type: "definition",
      question: "What does \'perspicacious\' mean?",
      options: [
      "Showing great attention to detail",
      "Having keen insight and understanding",
      "Being overly critical or harsh",
      "Displaying excessive pride"],

      correct: 1
    },
    {
      type: "synonym",
      question: "Which word is a synonym for \'perspicacious\'?",
      options: ["Obtuse", "Astute", "Careless", "Confused"],
      correct: 1
    },
    {
      type: "usage",
      question: "Complete the sentence: \'The _____ investor spotted the opportunity before anyone else.'",
      options: ["perspicacious", "perspicuous", "perspiration", "perspective"],
      correct: 0
    },
    {
      type: "context",
      question: "In which context would \'perspicacious\' be most appropriate?",
      options: [
      "Describing someone's physical appearance",
      "Praising someone's mental sharpness",
      "Commenting on someone's cooking skills",
      "Discussing weather conditions"],

      correct: 1
    }]

  };

  const totalSteps = dailyChallenge.challenges.length;

  useEffect(() => {
    if (showResults) {
      const correctAnswers = dailyChallenge.challenges.filter(
        (challenge, index) => userAnswers[index] === challenge.correct
      ).length;
      setScore(Math.round(correctAnswers / totalSteps * 100));
    }
  }, [showResults, userAnswers, totalSteps]);

  const handleAnswerSelect = (answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentStep]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const playPronunciation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(dailyChallenge.word);
      utterance.rate = 0.7;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const resetChallenge = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200 rounded-2xl p-8 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-accent-800 mb-2">Challenge Completed!</h2>
          <p className="text-accent-700 mb-4">
            Great job! You've mastered today's word: <strong>{dailyChallenge.word}</strong>
          </p>
          <div className="text-3xl font-bold text-accent-600 mb-4">{score}%</div>
          <p className="text-sm text-accent-600">
            Come back tomorrow for a new word challenge!
          </p>
        </div>
        
        <button
          onClick={resetChallenge}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">

          Try Again
        </button>
      </div>);

  }

  if (showResults) {
    const correctAnswers = dailyChallenge.challenges.filter(
      (challenge, index) => userAnswers[index] === challenge.correct
    ).length;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Challenge Results</h2>
            <div className="text-4xl font-bold text-primary-600 mb-2">{score}%</div>
            <p className="text-text-secondary">
              You got {correctAnswers} out of {totalSteps} questions correct
            </p>
          </div>

          {/* Results Breakdown */}
          <div className="space-y-4 mb-6">
            {dailyChallenge.challenges.map((challenge, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === challenge.correct;

              return (
                <div key={index} className={`p-4 rounded-lg border ${
                isCorrect ? 'bg-accent-50 border-accent-200' : 'bg-error-50 border-error-200'}`
                }>
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={isCorrect ? "CheckCircle" : "XCircle"}
                      size={20}
                      className={isCorrect ? "text-accent-600" : "text-error-600"} />

                    <div className="flex-1">
                      <p className="font-medium text-text-primary mb-1">
                        {challenge.question}
                      </p>
                      <p className={`text-sm ${isCorrect ? 'text-accent-700' : 'text-error-700'}`}>
                        Your answer: {challenge.options[userAnswer]}
                      </p>
                      {!isCorrect &&
                      <p className="text-sm text-accent-700 mt-1">
                          Correct answer: {challenge.options[challenge.correct]}
                        </p>
                      }
                    </div>
                  </div>
                </div>);

            })}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetChallenge}
              className="px-6 py-3 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-100 transition-colors duration-200">

              Try Again
            </button>
            <button
              onClick={handleComplete}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">

              Complete Challenge
            </button>
          </div>
        </div>
      </div>);

  }

  const currentChallenge = dailyChallenge.challenges[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Daily Word Challenge</h2>
            <p className="text-sm text-text-secondary">{dailyChallenge.date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary-600" />
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            dailyChallenge.difficulty === 'beginner' ? 'bg-accent-100 text-accent-700' :
            dailyChallenge.difficulty === 'intermediate' ? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'}`
            }>
              {dailyChallenge.difficulty}
            </span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-text-primary mb-2">
            {dailyChallenge.word}
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-text-secondary font-mono">
              {dailyChallenge.pronunciation}
            </span>
            <button
              onClick={playPronunciation}
              className="p-2 rounded-full hover:bg-primary-100 transition-colors duration-200">

              <Icon name="Volume2" size={18} className="text-primary-600" />
            </button>
          </div>
          <p className="text-text-secondary leading-relaxed">
            {dailyChallenge.definition}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round((currentStep + 1) / totalSteps * 100)}% Complete
          </span>
        </div>
        <div className="progress-indicator h-2">
          <div
            className="progress-bar rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep + 1) / totalSteps * 100}%` }}>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {currentChallenge.question}
        </h3>

        <div className="space-y-3">
          {currentChallenge.options.map((option, index) =>
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
            userAnswers[currentStep] === index ?
            'bg-primary-50 border-primary-300 text-primary-700' : 'bg-surface-50 border-border hover:bg-surface-100 text-text-primary'}`
            }>

              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              userAnswers[currentStep] === index ?
              'border-primary-500 bg-primary-500' : 'border-border'}`
              }>
                  {userAnswers[currentStep] === index &&
                <Icon name="Check" size={14} color="white" />
                }
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">

          <Icon name="ChevronLeft" size={18} />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={userAnswers[currentStep] === undefined}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">

          <span>{currentStep === totalSteps - 1 ? 'Finish' : 'Next'}</span>
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>);

};

export default DailyWordChallenge;