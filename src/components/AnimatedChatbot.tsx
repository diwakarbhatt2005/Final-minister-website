import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Users, BookOpen, Sparkles, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const GoldenMinisterialChatbot: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I'm the Minister's AI Assistant. I can help you with information about policies, initiatives, and how to connect with our office. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = [
    { text: 'What are the current key initiatives?', icon: BookOpen },
    { text: 'How can I schedule a meeting?', icon: Users },
    { text: 'What is the latest policy update?', icon: Sparkles },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
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

    // Simulate bot response with realistic government responses
    setTimeout(() => {
      const responses = [
        "Thank you for your question about our policies. I'm here to provide information about the Minister's initiatives and help you understand our commitment to public service.",
        "That's an excellent question! Our current focus areas include healthcare reform, education modernization, and digital transformation. Would you like me to elaborate on any specific area?",
        "I appreciate your interest in our community programs. We have several ongoing initiatives that welcome citizen participation. Let me share some details about how you can get involved.",
        "Our healthcare reform initiative aims to provide accessible and affordable healthcare for all citizens. This includes infrastructure development, digital health services, and expanded coverage programs.",
        "For meeting scheduling, please contact our office directly at the provided contact information, or use the official booking system available on our website's contact page."
      ];

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  if (!visible) return null;

  return (
    <div className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-white">
      {/* Golden Header */}
      <div 
        className="flex items-center justify-between px-4 py-4 md:px-6 md:py-4" 
        style={{ background: 'linear-gradient(135deg, #D4B429 0%, #B8941F 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm">
            <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm md:text-base text-white">Minister's AI Assistant</div>
            <div className="text-xs md:text-sm text-white/90 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Online now
            </div>
          </div>
        </div>
        <button 
          aria-label="Close chatbot" 
          onClick={() => setVisible(false)} 
          className="text-white hover:bg-white/20 rounded-lg p-1 transition-all duration-200"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Quick Questions Section */}
      <div className="px-4 py-4 md:px-6 bg-white border-b border-gray-100">
        <div className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Quick Questions:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuickQuestion(q.text)}
              className="flex items-center gap-2 px-3 py-3 md:px-4 md:py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs md:text-sm text-gray-700 transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-gray-300"
            >
              <q.icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-left">{q.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="bg-gray-50 px-4 py-4 md:px-6">
        <div className="max-h-64 md:max-h-80 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              {message.isBot ? (
                <>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white text-gray-800 px-4 py-3 rounded-xl shadow-sm border border-gray-100 max-w-full md:max-w-2xl">
                      <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-1">
                      {message.id === 'welcome' ? '11:21' : message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex justify-end w-full">
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-xl max-w-xs md:max-w-md">
                    <p className="text-sm md:text-base">{message.text}</p>
                    <div className="text-xs text-blue-200 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>
              <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-gray-600 text-sm">Typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="px-4 py-4 md:px-6 border-t bg-white">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about policies, initiatives, or services..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-24"
              rows={1}
              style={{ lineHeight: '1.4' }}
            />
          </div>
          <button
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center min-w-[44px] h-[44px] md:h-[50px] md:min-w-[50px]"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        
        {/* Pro Tip for Mobile */}
        <div className="mt-3 md:hidden">
          <button
            onClick={() => setShowTip(!showTip)}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            💡 {showTip ? 'Hide Tip' : 'Show Pro Tip'}
          </button>
          {showTip && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Pro Tip:</strong> Ask specific questions about policies, initiatives, or community programs for detailed responses.
              </p>
            </div>
          )}
        </div>

        {/* Desktop Pro Tip */}
        <div className="hidden md:block mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>💡 Pro Tip:</strong> Ask specific questions about policies, initiatives, or community programs for detailed responses.
          </p>
        </div>

        {/* Footer Text */}
        <div className="text-xs text-gray-500 mt-3 text-center">
          Powered by advanced AI • Responses are generated based on official information
        </div>
      </div>
    </div>
  );
};

export default GoldenMinisterialChatbot;
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, Bot, User, Sparkles, Clock, BookOpen, Zap, MessageSquare, Users } from 'lucide-react';
// import { useLanguage } from '../context/LanguageContext';

// interface Message {
//   id: string;
//   text: string;
//   isBot: boolean;
//   timestamp: Date;
// }

// const AnimatedChatbot: React.FC = () => {
//   const { t } = useLanguage();
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: t('chatGreeting'),
//       isBot: true,
//       timestamp: new Date(),
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [showTip, setShowTip] = useState(false);

//   const quickQuestions = [
//     { text: 'What are the current policy initiatives?', icon: BookOpen },
//     { text: 'How can I get involved in community programs?', icon: Users },
//     { text: 'What is the healthcare reform about?', icon: Sparkles },
//     { text: 'Tell me about education initiatives', icon: Zap },
//   ];

//   const sidebarItems = [
//     { icon: Sparkles, text: 'Ask about policies', color: 'text-blue-500' },
//     { icon: BookOpen, text: 'Learn about initiatives', color: 'text-purple-500' },
//     { icon: Clock, text: 'Get quick answers', color: 'text-pink-500' },
//     { icon: MessageSquare, text: 'Policy guidance', color: 'text-green-500' },
//   ];

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async (message: string) => {
//     if (!message.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: message,
//       isBot: false,
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');
//     setIsTyping(true);

//     // Simulate bot response
//     setTimeout(() => {
//       const responses = [
//         "Thank you for your question about our policies. I'm here to provide information about the Minister's initiatives and help you understand our commitment to public service.",
//         "That's an excellent question! Our current focus areas include healthcare reform, education modernization, and digital transformation. Would you like me to elaborate on any specific area?",
//         "I appreciate your interest in our community programs. We have several ongoing initiatives that welcome citizen participation. Let me share some details about how you can get involved.",
//         "Our healthcare reform initiative aims to provide accessible and affordable healthcare for all citizens. This includes infrastructure development, digital health services, and expanded coverage programs."
//       ];

//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         text: responses[Math.floor(Math.random() * responses.length)],
//         isBot: true,
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, botResponse]);
//       setIsTyping(false);
//     }, 2000);
//   };

//   const handleQuickQuestion = (question: string) => {
//     handleSendMessage(question);
//   };

//   return (
//     <div 
//       className="flex h-[600px]"
//       style={{ background: 'var(--card-white)' }}
//     >
//       {/* Sidebar */}
//       <motion.div
//         className="w-80 border-r p-6"
//         style={{ 
//           background: 'var(--background-light)',
//           borderColor: 'var(--glass-warm)'
//         }}
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div
//           className="mb-8"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="flex items-center space-x-3 mb-6">
//             <motion.div
//               className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
//               style={{
//                 background: 'linear-gradient(135deg, var(--primary-maroon), var(--accent-gold))'
//               }}
//               animate={{ rotate: [0, 360] }}
//               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//             >
//               <Bot className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h3 className="font-bold text-lg" style={{ color: 'var(--text-dark)' }}>Minister's AI</h3>
//               <p className="text-sm" style={{ color: 'var(--neutral-light-gray)' }}>Always here to help</p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           className="space-y-3 mb-8"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {sidebarItems.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <motion.div
//                 key={index}
//                 className="flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer group professional-card"
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.4 + index * 0.1 }}
//               >
//                 <motion.div
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
//                 </motion.div>
//                 <span 
//                   className="text-sm font-medium transition-colors"
//                   style={{ color: 'var(--neutral-warm-gray)' }}
//                 >
//                   {item.text}
//                 </span>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.6 }}
//         >
//           <h4 
//             className="text-sm font-bold uppercase tracking-wide mb-4"
//             style={{ color: 'var(--neutral-light-gray)' }}
//           >
//             Quick Questions
//           </h4>
//           <div className="space-y-2">
//             {quickQuestions.map((question, index) => {
//               const Icon = question.icon;
//               return (
//                 <motion.button
//                   key={index}
//                   onClick={() => handleQuickQuestion(question.text)}
//                   className="w-full text-left p-3 text-sm rounded-lg transition-all duration-300 group flex items-start space-x-2"
//                   style={{ 
//                     color: 'var(--neutral-warm-gray)',
//                   }}
//                   whileHover={{ x: 5 }}
//                   initial={{ x: -10, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.7 + index * 0.1 }}
//                 >
//                   <Icon 
//                     className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform" 
//                     style={{ color: 'var(--accent-gold)' }}
//                   />
//                   <span>{question.text}</span>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </motion.div>

//         <motion.div
//           className="mt-8 p-4 rounded-xl border"
//           style={{
//             background: 'var(--glass-warm)',
//             borderColor: 'rgba(255, 215, 0, 0.3)'
//           }}
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <div className="flex items-center space-x-2 mb-2">
//             <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
//             <span className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Pro Tip</span>
//           </div>
//           <p className="text-xs" style={{ color: 'var(--neutral-warm-gray)' }}>
//             Ask specific questions about policies, initiatives, or community programs for detailed responses.
//           </p>
//         </motion.div>
//       </motion.div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <motion.div
//           className="p-6 border-b"
//           style={{
//             background: 'var(--background-light)',
//             borderColor: 'var(--glass-warm)'
//           }}
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-bold text-lg" style={{ color: 'var(--text-dark)' }}>Chat with Minister's AI</h3>
//               <p className="text-sm" style={{ color: 'var(--neutral-light-gray)' }}>Get instant answers to your questions</p>
//             </div>
//             <motion.div
//               className="flex items-center space-x-2 px-3 py-1 rounded-full"
//               style={{ background: 'rgba(27, 94, 32, 0.2)' }}
//               animate={{ scale: [1, 1.05, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               <div className="w-2 h-2 rounded-full" style={{ background: 'var(--secondary-green)' }} />
//               <span className="text-xs font-medium" style={{ color: 'var(--secondary-green)' }}>Online</span>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           <AnimatePresence>
//             {messages.map((message, index) => (
//               <motion.div
//                 key={message.id}
//                 className={`flex items-start space-x-4 ${
//                   message.isBot ? 'justify-start' : 'justify-end'
//                 }`}
//                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 {message.isBot && (
//                   <motion.div
//                     className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                   >
//                     <Bot className="w-5 h-5 text-white" />
//                   </motion.div>
//                 )}
                
//                 <motion.div
//                   className={`max-w-md px-6 py-4 rounded-2xl shadow-lg ${
//                     message.isBot
//                       ? 'border'
//                       : 'text-white'
//                   }`}
//                   style={message.isBot ? {
//                     background: 'var(--background-light)',
//                     color: 'var(--text-dark)',
//                     borderColor: 'var(--glass-warm)'
//                   } : {
//                     background: 'linear-gradient(135deg, var(--primary-maroon), var(--primary-burgundy))'
//                   }}
//                   whileHover={{ scale: 1.02 }}
//                   layout
//                 >
//                   <p className="text-sm leading-relaxed">{message.text}</p>
//                   <p className={`text-xs mt-2 ${
//                     message.isBot ? '' : 'text-white/70'
//                   }`}>
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </p>
//                 </motion.div>

//                 {!message.isBot && (
//                   <motion.div
//                     className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg"
//                     whileHover={{ scale: 1.1, rotate: -5 }}
//                   >
//                     <User className="w-5 h-5 text-white" />
//                   </motion.div>
//                 )}
//               </motion.div>
//             ))}
//           </AnimatePresence>
          
//           {isTyping && (
//             <motion.div
//               className="flex items-start space-x-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <div 
//                 className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
//                 style={{
//                   background: 'linear-gradient(135deg, var(--primary-maroon), var(--accent-gold))'
//                 }}
//               >
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               <div 
//                 className="px-6 py-4 rounded-2xl border shadow-lg"
//                 style={{
//                   background: 'var(--background-light)',
//                   borderColor: 'var(--glass-warm)'
//                 }}
//               >
//                 <div className="flex space-x-2">
//                   {[0, 1, 2].map((i) => (
//                     <motion.div
//                       key={i}
//                       className="w-2 h-2 rounded-full"
//                       style={{ background: 'var(--accent-gold)' }}
//                       animate={{ y: [0, -8, 0] }}
//                       transition={{
//                         duration: 0.6,
//                         repeat: Infinity,
//                         delay: i * 0.2,
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <motion.div
//           className="p-6 border-t"
//           style={{
//             background: 'var(--background-light)',
//             borderColor: 'var(--glass-warm)'
//           }}
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <div className="flex space-x-4">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
//                 placeholder={t('askSomething')}
//                 className="w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
//                 style={{
//                   background: 'var(--card-white)',
//                   borderColor: 'var(--glass-warm)',
//                   color: 'var(--text-dark)'
//                 }}
//               />
//               <motion.div
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2"
//                 animate={{ rotate: inputMessage ? 0 : 180 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Sparkles className="w-5 h-5" style={{ color: 'var(--neutral-light-gray)' }} />
//               </motion.div>
//             </div>
//             <motion.button
//               onClick={() => handleSendMessage(inputMessage)}
//               disabled={!inputMessage.trim() || isTyping}
//               className="text-white p-4 rounded-2xl transition-all duration-300 shadow-lg disabled:cursor-not-allowed btn-primary"
//               style={{
//                 background: !inputMessage.trim() || isTyping 
//                   ? 'var(--neutral-light-gray)' 
//                   : 'linear-gradient(135deg, var(--primary-maroon), var(--primary-burgundy))'
//               }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Send className="w-5 h-5" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AnimatedChatbot;