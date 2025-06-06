import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  Phone, 
  Heart,
  Brain,
  Clock,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'crisis' | 'normal';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI mental health support companion. I'm here to listen, provide support, and help you with coping strategies. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'death',
    'hopeless', 'no point', 'give up', 'cant go on', 'self harm'
  ];

  const detectCrisis = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (detectCrisis(userMessage)) {
      setCrisisDetected(true);
      return "I'm very concerned about what you've shared. Your life has value and there are people who want to help. Please consider reaching out to a crisis hotline immediately. In the US, you can call 988 for the Suicide & Crisis Lifeline. Would you like me to help you find local emergency resources?";
    }

    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "I understand you're feeling anxious. Anxiety can be overwhelming, but there are techniques that can help. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you through some other grounding exercises?";
    }

    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      return "I hear that you're feeling sad. It's important to acknowledge these feelings rather than push them away. Sometimes sadness is our mind's way of processing difficult experiences. Have you been able to engage in any activities that usually bring you joy recently?";
    }

    if (lowerMessage.includes('stressed') || lowerMessage.includes('stress')) {
      return "Stress can really take a toll on both our mental and physical health. Let's work on some stress management techniques. Have you tried progressive muscle relaxation or mindfulness meditation? I can guide you through either of these.";
    }

    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return "Sleep issues can significantly impact mental health. Good sleep hygiene is crucial. Try establishing a consistent bedtime routine, avoiding screens an hour before bed, and creating a calm environment. Are there specific thoughts keeping you awake at night?";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('help')) {
      return "I'm glad I could help! Remember, seeking support is a sign of strength, not weakness. It's wonderful that you're taking steps to care for your mental health. Is there anything specific you'd like to work on or discuss further?";
    }

    // Default supportive responses
    const responses = [
      "Thank you for sharing that with me. It takes courage to open up about your feelings. Can you tell me more about what's been on your mind lately?",
      "I appreciate you trusting me with your thoughts. Your feelings are valid, and it's important to process them. What's been the most challenging part of your day?",
      "I'm here to listen and support you. Everyone faces difficult times, and you're not alone in this. What kind of support would be most helpful for you right now?",
      "It sounds like you're going through a lot. Remember that it's okay to not be okay sometimes. What are some things that have helped you cope in the past?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'normal'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: detectCrisis(inputMessage) ? 'crisis' : 'normal'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Mental Health Support</h1>
            <p className="text-blue-100">24/7 confidential support and guidance</p>
          </div>
        </div>
      </div>

      {/* Crisis Alert */}
      {crisisDetected && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Crisis Support Resources</h3>
              <div className="space-y-2 text-red-700">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">US Crisis Lifeline: 988</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">Crisis Text Line: Text HOME to 741741</span>
                </div>
                <p className="text-sm">If you're in immediate danger, please call 911 or go to your nearest emergency room.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-green-500'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    : message.type === 'crisis'
                    ? 'bg-red-50 border-2 border-red-200 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
                <div className={`flex items-center justify-end mt-2 text-xs ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="mt-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Share your thoughts or ask for support..."
            className="flex-1 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Helpful Tips */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Heart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700">
              <strong>Remember:</strong> This AI is designed to provide support and coping strategies, 
              but it's not a replacement for professional mental health care. If you\'re experiencing 
              a crisis, please reach out to emergency services or a mental health professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;