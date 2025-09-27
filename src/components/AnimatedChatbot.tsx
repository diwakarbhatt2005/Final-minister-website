import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Users, BookOpen, Sparkles, X, FileText, MessageSquare, Mic, Plus, Settings, ExternalLink, Trash2, Phone } from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  isBot: boolean;
  timestamp: Date;
  audioUrl?: string;
  videoUrl?: string;
}

interface HistoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

const MinisterBot: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! How can I assist you today regarding the Minister's work?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = [
    'What are the current policy initiatives?',
    'How can I get involved in community programs?',
    'What is the healthcare reform about?',
    'What are the latest government schemes?'
  ];

  const exampleCards = [
    { text: 'Help me draft a policy document', icon: '📄' },
    { text: 'Explain current government schemes', icon: '�️' },
    { text: 'Create a constituency report', icon: '�' },
    { text: 'Analyze public welfare programs', icon: '🤝' }
  ];

  const historyItems: HistoryItem[] = [
    {
      id: '1',
      title: "Minister's Office Introduction",
      description: 'Initial setup and introduction to government services',
      timestamp: '11:49'
    },
    {
      id: '2', 
      title: 'Policy Assistance',
      description: 'Help with government policies and regulations',
      timestamp: '11:49'
    },
    {
      id: '3',
      title: 'Speech Writing',
      description: 'Collaborative speech writing for official events',
      timestamp: '11:49'
    },
    {
      id: '4',
      title: 'Government Data Analysis',
      description: 'Assistance with interpreting statistical data and reports',
      timestamp: '11:49'
    }
  ];

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      // scroll the messages container only to avoid moving the whole page
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' as ScrollBehavior });
      } catch (err) {
        // fallback for older browsers
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [messages]);

  // File input ref for upload
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // MediaRecorder state for mic recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

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

    setTimeout(() => {
      const responses = [
        "Thank you for your inquiry. As Minister Bot, I can help you draft policy documents by providing structured templates, key policy points, and ensuring compliance with government standards. What specific policy area are you working on?",
        "I can explain our current government schemes including healthcare initiatives, education reforms, digital India programs, and welfare schemes. Our schemes focus on inclusive development and citizen empowerment. Which scheme would you like to know more about?",
        "For constituency reports, I can help you analyze demographic data, development metrics, public feedback, and progress indicators. I'll structure the report with key statistics, achievements, and areas for improvement. What constituency data do you need analyzed?",
        "I can assist in analyzing public welfare programs by examining coverage, beneficiary data, impact assessments, and budget utilization. This includes schemes for healthcare, education, employment, and social security. Which program would you like me to analyze?",
        "As your AI assistant for government policies, I can help with policy research, draft documents, analyze data, create reports, and provide insights on governance best practices. How can I specifically assist you today?"
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

  const handleExampleCard = (text: string) => {
    handleSendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  const handleFileButton = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadedFileName(file.name);
    // For now: add a message indicating file uploaded (replace with real upload logic as needed)
    const fileMsg: Message = {
      id: Date.now().toString(),
      text: `Uploaded file: ${file.name}`,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, fileMsg]);
    // clear input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleNewChat = () => {
    // Reset chat to welcome
    const welcome: Message = {
      id: 'welcome',
      text: "Hello! I'm the Minister's AI Assistant. I can help you with information about policies, initiatives, and how to connect with our office. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    };
    setMessages([welcome]);
    setInputMessage('');
  };

  

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Microphone not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const audioMsg: Message = {
          id: Date.now().toString(),
          isBot: false,
          timestamp: new Date(),
          audioUrl: url,
        };
        setMessages(prev => [...prev, audioMsg]);
      };
      mr.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert('Could not access microphone.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setIsRecording(false);
  };

  const handleDeleteHistory = (historyId: string) => {
    // Handle delete history item
    console.log('Delete history item:', historyId);
  };

  const handleVoiceAgent = () => {
    setShowVoiceAgent(!showVoiceAgent);
  };

  if (!visible) return null;

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
          <div className="w-80 h-full bg-gray-50 border-r border-gray-200 flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg text-gray-900">Minister Bot</h1>
                    <p className="text-sm text-gray-600">AI Assistant</p>
                  </div>
                </div>
                <button onClick={() => setShowMobileMenu(false)} className="p-1">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Mobile History Section */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 mb-4">History</h2>
                <div className="space-y-3">
                  {historyItems.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg hover:bg-white hover:border-yellow-400 cursor-pointer border border-gray-200 transition-all duration-300 group shadow-sm relative">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm group-hover:text-yellow-600">{item.title}</h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs text-gray-500">Invalid Date</span>
                            <span className="text-yellow-500">•</span>
                            <span className="text-xs text-yellow-600">{item.timestamp}</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteHistory(item.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700"
                          title="Delete conversation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex w-80 bg-gray-50 border-r border-gray-200 flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-semibold text-lg text-gray-900">Minister Bot</h1>
              <p className="text-sm text-gray-600">AI Assistant</p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">History</h2>
            <div className="space-y-3">
              {historyItems.map((item) => (
                <div key={item.id} className="p-3 rounded-lg hover:bg-white hover:border-yellow-400 cursor-pointer border border-gray-200 transition-all duration-300 group shadow-sm relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm group-hover:text-yellow-600">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-gray-500">Invalid Date</span>
                        <span className="text-yellow-500">•</span>
                        <span className="text-xs text-yellow-600">{item.timestamp}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistory(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header - Gray header to match history */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between lg:justify-end">
          {/* Mobile title */}
          <div className="lg:hidden flex items-center gap-3 ml-14">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="font-semibold text-base text-gray-900">Minister Bot</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={handleVoiceAgent}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-colors ${
                showVoiceAgent ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              title="Real-time Voice Agent"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="hidden md:flex w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg items-center justify-center transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={handleNewChat} className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
          </div>
        </div>

  {/* Chat Content */}
  <div ref={messagesContainerRef} className="flex-1 p-3 md:p-6 overflow-y-auto bg-gray-50 relative">
          {messages.length === 1 ? (
            /* Welcome State */
            <div className="max-w-4xl mx-auto">
              {/* Centered Title */}
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-3xl font-semibold text-gray-900 mb-3 md:mb-4">How can I help you today?</h2>
                <p className="text-sm md:text-lg text-gray-600 px-2">I'm Minister Bot, your AI assistant for government policies and initiatives. Ask me anything or try one of these examples:</p>
              </div>
              
              {/* Example Cards - 2x2 Grid on desktop, 1 column on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {exampleCards.map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleCard(card.text)}
                      className="p-3 md:p-4 border-2 border-dashed border-gray-300 hover:border-yellow-500 rounded-lg hover:bg-yellow-50 transition-all duration-300 text-left group bg-white"
                    >
                      <div className="text-lg md:text-xl mb-2">{card.icon}</div>
                      <p className="text-gray-700 group-hover:text-yellow-600 text-xs md:text-sm font-medium">{card.text}</p>
                    </button>
                  ))}
              </div>


            </div>
          ) : (
            /* Chat Messages */
            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  {message.isBot ? (
                    <div className="flex items-start gap-3 max-w-2xl">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl shadow-sm">
                          {message.videoUrl ? (
                            <video src={message.videoUrl} controls className="max-w-full rounded-md" />
                          ) : message.audioUrl ? (
                            <audio src={message.audioUrl} controls className="w-full" />
                          ) : (
                            <p>{message.text}</p>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.id === 'welcome' ? '11:21' : message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-3 rounded-xl max-w-md shadow-sm">
                      {message.audioUrl ? (
                        <audio src={message.audioUrl} controls className="w-full" />
                      ) : (
                        <p className="font-medium">{message.text}</p>
                      )}
                      <p className="text-xs text-yellow-100 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Voice Agent Overlay */}
          {showVoiceAgent && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center">
                <div className="mb-4">
                  <img 
                    src="/original-7170a735f9fbc50004dc5ece58421c06.gif" 
                    alt="Voice Agent" 
                    className="w-32 h-32 mx-auto rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Voice Agent</h3>
                <p className="text-gray-600 mb-4">Speak naturally and get instant responses from our AI assistant.</p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => setShowVoiceAgent(false)}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-gray-50 border-t border-gray-200 p-3 md:p-4 pb-safe">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap sm:flex-nowrap">
              {/* hidden file input used by upload button */}
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
              <button onClick={handleFileButton} className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0 touch-manipulation" title="Upload file">
                <FileText className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <div className="flex-1 relative min-w-0">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full h-10 md:h-12 px-3 md:px-4 border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm md:text-base"
                />
              </div>

              <button onClick={handleNewChat} className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0 touch-manipulation" title="Add">
                <Plus className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={() => { if (isRecording) stopRecording(); else startRecording(); }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 touch-manipulation ${
                  isRecording ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                }`} 
                title="Record voice"
              >
                <Mic className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white disabled:text-gray-500 flex items-center justify-center transition-colors flex-shrink-0 touch-manipulation"
              >
                <Send className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
            <div className="text-center mt-2 px-2">
              <p className="text-xs text-gray-500">Powered by advanced AI • Responses are generated based on official information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinisterBot;
// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Bot, Users, BookOpen, Sparkles, X } from 'lucide-react';

// interface Message {
//   id: string;
//   text: string;
//   isBot: boolean;
//   timestamp: Date;
// }

// const GoldenMinisterialChatbot: React.FC = () => {
//   const [visible, setVisible] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 'welcome',
//       text: "Hello! I'm the Minister's AI Assistant. I can help you with information about policies, initiatives, and how to connect with our office. What would you like to know?",
//       isBot: true,
//       timestamp: new Date(),
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [showTip, setShowTip] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   const quickQuestions = [
//     { text: 'What are the current key initiatives?', icon: BookOpen },
//     { text: 'How can I schedule a meeting?', icon: Users },
//     { text: 'What is the latest policy update?', icon: Sparkles },
//   ];

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = (message: string) => {
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

//     // Simulate bot response with realistic government responses
//     setTimeout(() => {
//       const responses = [
//         "Thank you for your question about our policies. I'm here to provide information about the Minister's initiatives and help you understand our commitment to public service.",
//         "That's an excellent question! Our current focus areas include healthcare reform, education modernization, and digital transformation. Would you like me to elaborate on any specific area?",
//         "I appreciate your interest in our community programs. We have several ongoing initiatives that welcome citizen participation. Let me share some details about how you can get involved.",
//         "Our healthcare reform initiative aims to provide accessible and affordable healthcare for all citizens. This includes infrastructure development, digital health services, and expanded coverage programs.",
//         "For meeting scheduling, please contact our office directly at the provided contact information, or use the official booking system available on our website's contact page."
//       ];

//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         text: responses[Math.floor(Math.random() * responses.length)],
//         isBot: true,
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, botResponse]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const handleQuickQuestion = (question: string) => {
//     handleSendMessage(question);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage(inputMessage);
//     }
//   };

//   if (!visible) return null;

//   return (
//     <div className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-white">
//       {/* Golden Header */}
//       <div 
//         className="flex items-center justify-between px-4 py-4 md:px-6 md:py-4" 
//         style={{ background: 'linear-gradient(135deg, #D4B429 0%, #B8941F 100%)' }}
//       >
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm">
//             <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
//           </div>
//           <div>
//             <div className="font-bold text-sm md:text-base text-white">Minister's AI Assistant</div>
//             <div className="text-xs md:text-sm text-white/90 flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               Online now
//             </div>
//           </div>
//         </div>
//         <button 
//           aria-label="Close chatbot" 
//           onClick={() => setVisible(false)} 
//           className="text-white hover:bg-white/20 rounded-lg p-1 transition-all duration-200"
//         >
//           <X className="w-5 h-5 md:w-6 md:h-6" />
//         </button>
//       </div>

//       {/* Quick Questions Section */}
//       <div className="px-4 py-4 md:px-6 bg-white border-b border-gray-100">
//         <div className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Quick Questions:</div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
//           {quickQuestions.map((q, i) => (
//             <button
//               key={i}
//               onClick={() => handleQuickQuestion(q.text)}
//               className="flex items-center gap-2 px-3 py-3 md:px-4 md:py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs md:text-sm text-gray-700 transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-gray-300"
//             >
//               <q.icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
//               <span className="text-left">{q.text}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Chat Messages Area */}
//       <div className="bg-gray-50 px-4 py-4 md:px-6">
//         <div className="max-h-64 md:max-h-80 overflow-y-auto space-y-4">
//           {messages.map((message) => (
//             <div key={message.id} className="flex items-start gap-3">
//               {message.isBot ? (
//                 <>
//                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
//                     <Bot className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="bg-white text-gray-800 px-4 py-3 rounded-xl shadow-sm border border-gray-100 max-w-full md:max-w-2xl">
//                       <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1 ml-1">
//                       {message.id === 'welcome' ? '11:21' : message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex justify-end w-full">
//                   <div className="bg-blue-600 text-white px-4 py-3 rounded-xl max-w-xs md:max-w-md">
//                     <p className="text-sm md:text-base">{message.text}</p>
//                     <div className="text-xs text-blue-200 mt-1">
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
          
//           {/* Typing Indicator */}
//           {isTyping && (
//             <div className="flex items-start gap-3">
//               <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                 <Bot className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
//               </div>
//               <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   <span className="ml-2 text-gray-600 text-sm">Typing...</span>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Input Section */}
//       <div className="px-4 py-4 md:px-6 border-t bg-white">
//         <div className="flex items-end gap-3">
//           <div className="flex-1">
//             <textarea
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask about policies, initiatives, or services..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-24"
//               rows={1}
//               style={{ lineHeight: '1.4' }}
//             />
//           </div>
//           <button
//             onClick={() => handleSendMessage(inputMessage)}
//             disabled={!inputMessage.trim() || isTyping}
//             className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center min-w-[44px] h-[44px] md:h-[50px] md:min-w-[50px]"
//           >
//             <Send className="w-4 h-4 md:w-5 md:h-5" />
//           </button>
//         </div>
        
//         {/* Pro Tip for Mobile */}
//         <div className="mt-3 md:hidden">
//           <button
//             onClick={() => setShowTip(!showTip)}
//             className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200"
//           >
//             💡 {showTip ? 'Hide Tip' : 'Show Pro Tip'}
//           </button>
//           {showTip && (
//             <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <p className="text-xs text-yellow-800">
//                 <strong>Pro Tip:</strong> Ask specific questions about policies, initiatives, or community programs for detailed responses.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Desktop Pro Tip */}
//         <div className="hidden md:block mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <p className="text-sm text-yellow-800">
//             <strong>💡 Pro Tip:</strong> Ask specific questions about policies, initiatives, or community programs for detailed responses.
//           </p>
//         </div>

//         {/* Footer Text */}
//         <div className="text-xs text-gray-500 mt-3 text-center">
//           Powered by advanced AI • Responses are generated based on official information
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoldenMinisterialChatbot;
