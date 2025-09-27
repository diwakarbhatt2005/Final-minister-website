import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Extend Window interface to include translator
declare global {
  interface Window {
    translator?: {
      storeOriginalTexts: () => void;
      translatePage: (lang: string) => Promise<void>;
    };
  }
}

interface AnimatedHeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ currentSection, onSectionChange }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'ministerbot', label: t('ministerbot') },
    { id: 'about', label: t('about') },
    { id: 'initiatives', label: t('initiatives') },
    { id: 'news', label: t('news') },
    { id: 'gallery', label: t('gallery') },
    { id: 'contact', label: t('contact') },
    { id: 'faq', label: t('faq') },
  ];

  useEffect(() => {
    // Theme handling removed: keep navbar permanently white per design

    // Initialize translation system
    if (window.translator) {
      window.translator.storeOriginalTexts();
    }

    // keep listener only if needed later; currently no scroll-dependent state
    return () => {};
  }, []);

  // Theme toggle removed per design

  const handleLanguageToggle = async () => {
    if (window.translator) {
      const newLang = language === 'en' ? 'hi' : 'en';
      await window.translator.translatePage(newLang);
      setLanguage(newLang);
    }
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      onSectionChange(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b shadow-lg`}
        style={{
          background: 'var(--card-white)',
          borderColor: 'var(--glass-warm)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ minHeight: '100px' }}>
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer no-translate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('ministerbot')}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-maroon), var(--accent-gold))'
                }}
                animate={{ 
                  rotateY: [0, 360],
                  boxShadow: [
                    "0 10px 25px rgba(139, 0, 0, 0.3)",
                    "0 15px 35px rgba(255, 215, 0, 0.4)",
                    "0 10px 25px rgba(139, 0, 0, 0.3)"
                  ]
                }}
                transition={{ 
                  rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="text-white font-bold text-xl">M</span>
              </motion.div>
              <motion.span 
                className="text-2xl font-bold"
                style={{ color: 'var(--text-dark)' }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Minister's Office
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-white shadow-lg'
                      : 'hover:bg-opacity-80'
                  }`}
                  style={{
                    background: 
                    currentSection === item.id 
                      ? 'linear-gradient(135deg, var(--primary-maroon), var(--primary-burgundy))'
                      : 'transparent',
                    color: currentSection === item.id 
                      ? 'white' 
                      : 'var(--text-dark)'
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {currentSection === item.id && (
                    <motion.div
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{
                        background: 'linear-gradient(135deg, var(--primary-maroon), var(--primary-burgundy))'
                      }}
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Theme toggle removed per design */}

              {/* Language Toggle */}
              <motion.button
                onClick={handleLanguageToggle}
                className="lang-toggle mt-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                <span className="no-translate">{language === 'en' ? 'हिंदी' : 'English'}</span>
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 rounded-xl backdrop-blur-sm transition-colors mt-1"
              style={{
               background: 'var(--background-light)',
                color: 'var(--text-dark)'
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            style={{
              background: 'var(--card-white)',
              borderColor: 'var(--glass-warm)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
             style={{
               background: 'var(--card-white)',
               borderColor: 'var(--glass-warm)'
             }}
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-300`}
                    style={
                      currentSection === item.id
                        ? {
                            color: 'white',
                            background: 'linear-gradient(135deg, var(--primary-maroon), var(--primary-burgundy))'
                          }
                        : {
                            color: 'var(--text-dark)',
                            background: 'transparent'
                          }
                    }
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--glass-warm)' }}>
                  <button
                    onClick={handleLanguageToggle}
                    className="w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-300 no-translate"
                    style={{ color: 'var(--text-dark)' }}
                  >
                    <Globe className="w-4 h-4 inline mr-2" />
                    {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
                  </button>
                  {/* Theme toggle removed per design */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedHeader;