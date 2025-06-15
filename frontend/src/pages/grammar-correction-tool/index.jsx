import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import TextAnalysisPanel from './components/TextAnalysisPanel';
import CorrectionPopup from './components/CorrectionPopup';
import ComparisonView from './components/ComparisonView';

const GrammarCorrectionTool = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedError, setSelectedError] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const textareaRef = useRef(null);

  // Mock grammar errors and suggestions
  const mockErrors = [
    {
      id: 1,
      text: "recieve",
      type: "spelling",
      start: 45,
      end: 52,
      suggestion: "receive",
      explanation: "Common spelling error: \'i\' before \'e\' except after \'c'",
      rule: "Spelling Rule"
    },
    {
      id: 2,
      text: "there",
      type: "grammar",
      start: 78,
      end: 83,
      suggestion: "their",
      explanation: "Use \'their\' to show possession, \'there\' for location",
      rule: "Possessive vs Location"
    },
    {
      id: 3,
      text: "very good",
      type: "style",
      start: 120,
      end: 129,
      suggestion: "excellent",
      explanation: "Consider using more precise vocabulary",
      rule: "Word Choice Enhancement"
    }
  ];

  const mockAnalysis = {
    errorCount: 3,
    readabilityScore: 78,
    grammarErrors: 1,
    spellingErrors: 1,
    styleImprovements: 1,
    wordCount: 156,
    characterCount: 892,
    readingTime: "2 min",
    toneAnalysis: "Professional",
    formalityLevel: "Moderate"
  };

  useEffect(() => {
    if (inputText.length > 10) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setAnalysisResults(mockAnalysis);
        setIsAnalyzing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [inputText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    
    if (newText !== inputText) {
      setUndoStack(prev => [...prev, inputText]);
    }
  };

  const handleErrorClick = (error) => {
    setSelectedError(error);
  };

  const applyCorrection = (error) => {
    const newText = inputText.substring(0, error.start) + 
                   error.suggestion + 
                   inputText.substring(error.end);
    
    setUndoStack(prev => [...prev, inputText]);
    setInputText(newText);
    setCorrectedText(newText);
    setSelectedError(null);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousText = undoStack[undoStack.length - 1];
      setInputText(previousText);
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  const handleOneClickCorrection = () => {
    let corrected = inputText;
    mockErrors.forEach(error => {
      corrected = corrected.replace(error.text, error.suggestion);
    });
    
    setUndoStack(prev => [...prev, inputText]);
    setInputText(corrected);
    setCorrectedText(corrected);
  };

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([correctedText || inputText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'corrected-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderHighlightedText = () => {
    if (!inputText) return null;
    
    let highlightedText = inputText;
    const errors = [...mockErrors].sort((a, b) => b.start - a.start);
    
    errors.forEach(error => {
      const errorClass = error.type === 'grammar' ? 'border-b-2 border-red-500 cursor-pointer' :
                        error.type === 'spelling'? 'border-b-2 border-red-400 cursor-pointer' : 'border-b-2 border-orange-400 cursor-pointer';
      
      const replacement = `<span class="${errorClass}" data-error-id="${error.id}">${error.text}</span>`;
      highlightedText = highlightedText.substring(0, error.start) + 
                       replacement + 
                       highlightedText.substring(error.end);
    });
    
    return { __html: highlightedText };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="lg:ml-64 pt-16 pb-20 lg:pb-8">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="CheckCircle" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Grammar Correction Tool</h1>
                <p className="text-text-secondary">Improve your writing with AI-powered grammar analysis</p>
              </div>
            </div>
            
            {/* Usage Instructions */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-primary-800 mb-1">How to use</h3>
                  <p className="text-sm text-primary-700">
                    Paste or type your text below. Grammar errors will be underlined in red, 
                    spelling mistakes in red, and style suggestions in orange. Click on any 
                    highlighted text for detailed explanations and corrections.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Text Editor */}
            <div className="xl:col-span-3">
              <div className="card p-6">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between mb-4 pb-4 border-b border-border">
                  <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                    <button
                      onClick={handleOneClickCorrection}
                      disabled={!inputText || mockErrors.length === 0}
                      className="btn-primary px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Icon name="Wand2" size={16} />
                      <span>Fix All</span>
                    </button>
                    
                    <button
                      onClick={handleUndo}
                      disabled={undoStack.length === 0}
                      className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-surface-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Icon name="Undo" size={16} />
                      <span>Undo</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-surface-100 flex items-center space-x-2"
                    >
                      <Icon name="GitCompare" size={16} />
                      <span>Compare</span>
                    </button>
                    
                    <button
                      onClick={handleExport}
                      disabled={!inputText}
                      className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-surface-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Icon name="Download" size={16} />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Text Input Area */}
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={handleTextChange}
                    placeholder="Paste your essay, email, or any text here for grammar analysis. Start typing to see real-time corrections and suggestions..."
                    className="w-full h-96 p-4 border border-border rounded-lg resize-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-text-primary bg-surface"
                    style={{ fontSize: '16px', lineHeight: '1.6' }}
                  />
                  
                  {/* Highlighted Text Overlay */}
                  {inputText && (
                    <div 
                      className="absolute inset-0 p-4 pointer-events-none text-transparent bg-transparent rounded-lg overflow-hidden"
                      style={{ 
                        fontSize: '16px', 
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word'
                      }}
                      dangerouslySetInnerHTML={renderHighlightedText()}
                    />
                  )}
                </div>

                {/* Text Statistics */}
                <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-border text-sm text-text-secondary">
                  <div className="flex items-center space-x-4">
                    <span>{inputText.length} characters</span>
                    <span>{inputText.split(/\s+/).filter(word => word.length > 0).length} words</span>
                    <span>{Math.ceil(inputText.split(/\s+/).length / 200)} min read</span>
                  </div>
                  
                  {isAnalyzing && (
                    <div className="flex items-center space-x-2 text-primary-600">
                      <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison View */}
              {showComparison && (
                <div className="mt-6">
                  <ComparisonView 
                    originalText={inputText}
                    correctedText={correctedText || inputText}
                    onClose={() => setShowComparison(false)}
                  />
                </div>
              )}
            </div>

            {/* Analysis Panel */}
            <div className="xl:col-span-1">
              <TextAnalysisPanel 
                analysisResults={analysisResults}
                isAnalyzing={isAnalyzing}
                errors={mockErrors}
                onErrorClick={handleErrorClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Correction Popup */}
      {selectedError && (
        <CorrectionPopup
          error={selectedError}
          onApply={() => applyCorrection(selectedError)}
          onClose={() => setSelectedError(null)}
        />
      )}
    </div>
  );
};

export default GrammarCorrectionTool;