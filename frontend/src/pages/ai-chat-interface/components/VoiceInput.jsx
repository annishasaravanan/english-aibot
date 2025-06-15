import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const VoiceInput = ({ isRecording, onRecordingChange, onTranscript }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        onRecordingChange(false);
        setAudioLevel(0);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        onRecordingChange(false);
        setAudioLevel(0);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onRecordingChange, onTranscript]);

  useEffect(() => {
    if (isRecording) {
      // Simulate audio level animation
      const animate = () => {
        setAudioLevel(Math.random() * 100);
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setAudioLevel(0);
    }
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
        onRecordingChange(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  if (!isSupported) {
    return (
      <button
        disabled
        className="p-3 rounded-full bg-surface-200 text-text-secondary cursor-not-allowed"
        title="Speech recognition not supported"
      >
        <Icon name="MicOff" size={20} />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggleRecording}
        className={`p-3 rounded-full transition-all duration-200 ${
          isRecording
            ? 'bg-error text-white shadow-lg scale-110'
            : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
        }`}
        title={isRecording ? 'Stop recording' : 'Start voice input'}
      >
        <Icon name={isRecording ? "Square" : "Mic"} size={20} />
      </button>

      {/* Audio Level Indicator */}
      {isRecording && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center">
          <div 
            className="w-2 h-2 bg-white rounded-full transition-transform duration-100"
            style={{ 
              transform: `scale(${0.5 + (audioLevel / 200)})` 
            }}
          />
        </div>
      )}

      {/* Recording Pulse Animation */}
      {isRecording && (
        <div className="absolute inset-0 rounded-full border-2 border-error animate-ping opacity-75" />
      )}
    </div>
  );
};

export default VoiceInput;