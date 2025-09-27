import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    initiatives: 'Initiatives',
    news: 'News & Events',
    gallery: 'Gallery',
    contact: 'Contact',
    faq: 'FAQ',
    ministerbot: 'Minister Bot',
    language: 'भाषा',
    
    // Hero Section
    heroQuote: '"Together, we build a stronger future for our nation and its people."',
    heroSubtext: 'Dedicated to serving the people with integrity, transparency, and unwavering commitment to progress.',
    learnMore: 'Learn More',
    
    // About Section
    aboutTitle: 'About the Minister',
    aboutSnippet: 'With decades of public service and a vision for transformative change, our Minister stands as a beacon of hope and progress for our nation.',
    readMore: 'Read More',
    
    // News Section
    latestNews: 'Latest News & Updates',
    
    // CTA
    ctaTitle: 'Join Our Community',
    ctaSubtext: 'Stay informed about the latest initiatives and be part of the change.',
    stayInformed: 'Stay Informed',
    
    // Chatbot
    chatWithBot: 'Chat with Minister\'s AI Assistant',
    chatIntro: 'Get immediate answers to common questions about policies, initiatives, and more.',
    startConversation: 'Start a Conversation',
    chatGreeting: 'Hello! How can I assist you today regarding the Minister\'s work?',
    askSomething: 'Ask something...',
    send: 'Send',
    
    // Footer
    copyright: '© 2025 Minister\'s Office. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'के बारे में',
    initiatives: 'पहल',
    news: 'समाचार और कार्यक्रम',
    gallery: 'गैलरी',
    contact: 'संपर्क',
    faq: 'सामान्य प्रश्न',
    ministerbot: 'मंत्री बॉट',
    language: 'English',
    
    // Hero Section
    heroQuote: '"मिलकर, हम अपने राष्ट्र और इसके लोगों के लिए एक मजबूत भविष्य का निर्माण करते हैं।"',
    heroSubtext: 'ईमानदारी, पारदर्शिता और प्रगति के लिए अटूट प्रतिबद्धता के साथ लोगों की सेवा करने के लिए समर्पित।',
    learnMore: 'और जानें',
    
    // About Section
    aboutTitle: 'मंत्री के बारे में',
    aboutSnippet: 'दशकों की सार्वजनिक सेवा और परिवर्तनकारी बदलाव की दृष्टि के साथ, हमारे मंत्री हमारे राष्ट्र के लिए आशा और प्रगति की किरण हैं।',
    readMore: 'और पढ़ें',
    
    // News Section
    latestNews: 'नवीनतम समाचार और अपडेट',
    
    // CTA
    ctaTitle: 'हमारे समुदाय में शामिल हों',
    ctaSubtext: 'नवीनतम पहलों के बारे में जानकारी रखें और बदलाव का हिस्सा बनें।',
    stayInformed: 'सूचित रहें',
    
    // Chatbot
    chatWithBot: 'मंत्री के AI सहायक से चैट करें',
    chatIntro: 'नीतियों, पहलों और अन्य के बारे में सामान्य प्रश्नों के तुरंत उत्तर प्राप्त करें।',
    startConversation: 'बातचीत शुरू करें',
    chatGreeting: 'नमस्ते! मैं आज मंत्री के कार्य के संबंध में आपकी कैसे सहायता कर सकता हूं?',
    askSomething: 'कुछ पूछें...',
    send: 'भेजें',
    
    // Footer
    copyright: '© 2025 मंत्री कार्यालय। सभी अधिकार सुरक्षित।',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};