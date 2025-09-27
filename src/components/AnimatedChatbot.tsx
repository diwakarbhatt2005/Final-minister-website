import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Clock, BookOpen, Zap, MessageSquare, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AnimatedChatbot: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chatGreeting'),
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { text: 'What are the current policy initiatives?', icon: BookOpen },
    { text: 'How can I get involved in community programs?', icon: Users },
    { text: 'What is the healthcare reform about?', icon: Sparkles },
    { text: 'Tell me about education initiatives', icon: Zap },
  ];

  const sidebarItems = [
    { icon: Sparkles, text: 'Ask about policies', color: 'text-blue-500' },
    { icon: BookOpen, text: 'Learn about initiatives', color: 'text-purple-500' },
    { icon: Clock, text: 'Get quick answers', color: 'text-pink-500' },
    { icon: MessageSquare, text: 'Policy guidance', color: 'text-green-500' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thank you for your question about our policies. I'm here to provide information about the Minister's initiatives and help you understand our commitment to public service.",
        "That's an excellent question! Our current focus areas include healthcare reform, education modernization, and digital transformation. Would you like me to elaborate on any specific area?",
        "I appreciate your interest in our community programs. We have several ongoing initiatives that welcome citizen participation. Let me share some details about how you can get involved.",
        "Our healthcare reform initiative aims to provide accessible and affordable healthcare for all citizens. This includes infrastructure development, digital health services, and expanded coverage programs."
      ];

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div 
      className="flex h-[600px]"
      style={{ background: 'var(--card-white)' }}
    >
      {/* Sidebar */}
      <motion.div
        className="w-80 border-r p-6"
        style={{ 
          background: 'var(--background-light)',
          borderColor: 'var(--glass-warm)'
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--primary-maroon), var(--accent-gold))'
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-dark)' }}>Minister's AI</h3>
              <p className="text-sm" style={{ color: 'var(--neutral-light-gray)' }}>Always here to help</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-3 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer group professional-card"
                whileHover={{ scale: 1.02, x: 5 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                </motion.div>
                <span 
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--neutral-warm-gray)' }}
                >
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h4 
            className="text-sm font-bold uppercase tracking-wide mb-4"
            style={{ color: 'var(--neutral-light-gray)' }}
          >
            Quick Questions
          </h4>
          <div className="space-y-2">
            {quickQuestions.map((question, index) => {
              const Icon = question.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => handleQuickQuestion(question.text)}
                  className="w-full text-left p-3 text-sm rounded-lg transition-all duration-300 group flex items-start space-x-2"
                  style={{ 
                    color: 'var(--neutral-warm-gray)',
                  }}
                  whileHover={{ x: 5 }}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Icon 
                    className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform" 
                    style={{ color: 'var(--accent-gold)' }}
                  />
                  <span>{question.text}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 p-4 rounded-xl border"
          style={{
            background: 'var(--glass-warm)',
            borderColor: 'rgba(255, 215, 0, 0.3)'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Pro Tip</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--neutral-warm-gray)' }}>
            Ask specific questions about policies, initiatives, or community programs for detailed responses.
          </p>
        </motion.div>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <motion.div
          className="p-6 border-b"
          style={{
            background: 'var(--background-light)',
            borderColor: 'var(--glass-warm)'
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-dark)' }}>Chat with Minister's AI</h3>
              <p className="text-sm" style={{ color: 'var(--neutral-light-gray)' }}>Get instant answers to your questions</p>
            </div>
            <motion.div
              className="flex items-center space-x-2 px-3 py-1 rounded-full"
              style={{ background: 'rgba(27, 94, 32, 0.2)' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--secondary-green)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--secondary-green)' }}>Online</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {message.isBot && (
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </motion.div>
                )}
                
                <motion.div
                  className={`max-w-md px-6 py-4 rounded-2xl shadow-lg ${
                    message.isBot
                      ? 'border'
                      : 'text-white'
                  }`}
                  style={message.isBot ? {
                    background: 'var(--background-light)',
                    color: 'var(--text-dark)',
                    borderColor: 'var(--glass-warm)'
                  } : {
                    background: 'linear-gradient(135deg, var(--primary-maroon), var(--primary-burgundy))'
                  }}
                  whileHover={{ scale: 1.02 }}
                  layout
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.isBot ? '' : 'text-white/70'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>

                {!message.isBot && (
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <User className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-maroon), var(--accent-gold))'
                }}
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div 
                className="px-6 py-4 rounded-2xl border shadow-lg"
                style={{
                  background: 'var(--background-light)',
                  borderColor: 'var(--glass-warm)'
                }}
              >
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: 'var(--accent-gold)' }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <motion.div
          className="p-6 border-t"
          style={{
            background: 'var(--background-light)',
            borderColor: 'var(--glass-warm)'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder={t('askSomething')}
                className="w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
                style={{
                  background: 'var(--card-white)',
                  borderColor: 'var(--glass-warm)',
                  color: 'var(--text-dark)'
                }}
              />
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                animate={{ rotate: inputMessage ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-5 h-5" style={{ color: 'var(--neutral-light-gray)' }} />
              </motion.div>
            </div>
            <motion.button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="text-white p-4 rounded-2xl transition-all duration-300 shadow-lg disabled:cursor-not-allowed btn-primary"
              style={{
                background: !inputMessage.trim() || isTyping 
                  ? 'var(--neutral-light-gray)' 
                  : 'linear-gradient(135deg, var(--primary-maroon), var(--primary-burgundy))'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedChatbot;