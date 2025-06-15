import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import ChatMessage from './components/ChatMessage';
import VoiceInput from './components/VoiceInput';
import GrammarTooltip from './components/GrammarTooltip';
import FeedbackModal from './components/FeedbackModal';
import EmotionMeter from './components/EmotionMeter';

const AiChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [conversationTone, setConversationTone] = useState('neutral');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mock conversation data
  const mockMessages = [
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI English tutor. I'm here to help you practice English conversation and improve your grammar. What would you like to talk about today?`,
      timestamp: new Date(Date.now() - 300000),
      hasAudio: true
    },
    {
      id: 2,
      type: 'user',
      content: "Hi! I want to practice talking about my hobbies. I really enjoys reading books and playing guitar.",
      timestamp: new Date(Date.now() - 240000),
      grammarErrors: [
        {
          text: 'enjoys',
          correction: 'enjoy',
          explanation: 'Use "enjoy" instead of "enjoys" because the subject "I" requires the base form of the verb.',
          position: { start: 67, end: 73 }
        }
      ]
    },
    {
      id: 3,
      type: 'ai',
      content: `That's wonderful! Reading and playing guitar are fantastic hobbies. I noticed a small grammar point - you should say "I really enjoy" instead of "I really enjoys." Can you tell me what kind of books you like to read?`,
      timestamp: new Date(Date.now() - 180000),
      hasAudio: true,
      feedback: { rating: 'up', comment: 'Very helpful correction!' }
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
      grammarErrors: detectGrammarErrors(inputText)
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      updateConversationTone();
    }, 1500);
  };

  const detectGrammarErrors = (text) => {
    // Mock grammar detection
    const errors = [];
    if (text.includes('I are')) {
      errors.push({
        text: 'I are',
        correction: 'I am',
        explanation: 'Use "I am" instead of "I are" - "am" is the correct form of "be" with "I".',
        position: { start: text.indexOf('I are'), end: text.indexOf('I are') + 5 }
      });
    }
    if (text.includes('good in')) {
      errors.push({
        text: 'good in',
        correction: 'good at',
        explanation: 'Use "good at" when talking about skills or abilities.',
        position: { start: text.indexOf('good in'), end: text.indexOf('good in') + 7 }
      });
    }
    return errors;
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      `That's interesting! Can you tell me more about that? I'd love to hear your thoughts on this topic.`,
      `Great point! Your English is improving. Let me help you with a small grammar tip to make it even better.`,
      `I understand what you're saying. Here's a suggestion to make your sentence sound more natural...`,
      `Excellent! You're expressing yourself very well. Keep practicing - you're doing great!`
    ];

    return {
      id: Date.now() + 1,
      type: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      hasAudio: true
    };
  };

  const updateConversationTone = () => {
    const tones = ['positive', 'neutral', 'encouraging', 'supportive'];
    setConversationTone(tones[Math.floor(Math.random() * tones.length)]);
  };

  const handleVoiceInput = (transcript) => {
    setInputText(transcript);
  };

  const handleFeedback = (messageId, rating, comment) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: { rating, comment } }
          : msg
      )
    );
    setShowFeedback(false);
    setSelectedMessageId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-16 left-0 right-0 lg:left-64 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/personalized-dashboard')}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-secondary" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">AI Tutor</h1>
                <p className="text-xs text-text-secondary">English Conversation Practice</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <EmotionMeter tone={conversationTone} />
            <button
              onClick={() => navigate('/grammar-correction-tool')}
              className="p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200"
              title="Grammar Tool"
            >
              <Icon name="CheckCircle" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="pt-32 pb-24 lg:pt-32 lg:pb-20 lg:ml-64">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onFeedback={(rating) => {
                  setSelectedMessageId(message.id);
                  setShowFeedback(true);
                }}
              />
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div className="conversation-bubble conversation-bubble-ai">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-surface border-t border-border safe-area-bottom">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 pr-12 border border-border rounded-2xl resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200 max-h-32"
                rows={1}
                style={{ minHeight: '48px' }}
              />
              
              {grammarErrors.length > 0 && (
                <GrammarTooltip errors={grammarErrors} />
              )}
            </div>
            
            <VoiceInput
              isRecording={isRecording}
              onRecordingChange={setIsRecording}
              onTranscript={handleVoiceInput}
            />
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`p-3 rounded-full transition-all duration-200 ${
                inputText.trim()
                  ? 'bg-primary text-white hover:bg-primary-600 shadow-md'
                  : 'bg-surface-200 text-text-secondary cursor-not-allowed'
              }`}
            >
              <Icon name="Send" size={20} />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-center mt-3 space-x-4">
            <button
              onClick={() => setInputText("Can you help me practice pronunciation?")}
              className="text-xs text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Practice Pronunciation
            </button>
            <button
              onClick={() => setInputText("I want to learn new vocabulary words.")}
              className="text-xs text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Learn Vocabulary
            </button>
            <button
              onClick={() => setInputText("Can you check my grammar?")}
              className="text-xs text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Grammar Check
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackModal
          messageId={selectedMessageId}
          onSubmit={handleFeedback}
          onClose={() => {
            setShowFeedback(false);
            setSelectedMessageId(null);
          }}
        />
      )}
    </div>
  );
};

export default AiChatInterface;