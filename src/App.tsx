import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import ParticleBackground from './components/ParticleBackground';
import AnimatedHeader from './components/AnimatedHeader';
import AnimatedHero from './components/AnimatedHero';
import AnimatedAbout from './components/AnimatedAbout';
import Initiatives from './pages/Initiatives';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import { LanguageProvider } from './context/LanguageContext';
import './services/translationService.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'initiatives', 'news', 'gallery', 'contact', 'faq'];
      const scrollPosition = window.scrollY + 150; // Account for fixed header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToNext = () => {
    scrollToSection('about');
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <LanguageProvider>
      <div 
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, var(--background-cream), var(--background-light))'
        }}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <Preloader key="preloader" onComplete={handlePreloaderComplete} />
          )}
        </AnimatePresence>

        {!isLoading && (
          <>
            <ParticleBackground />
            <AnimatedHeader 
              currentSection={currentSection} 
              onSectionChange={setCurrentSection}
            />
            
            <main className="relative z-10">
              <AnimatedHero onScrollToNext={handleScrollToNext} />
              <AnimatedAbout />
              <div id="initiatives">
                <Initiatives />
              </div>
              <div id="news">
                <News />
              </div>
              <div id="gallery">
                <Gallery />
              </div>
              <div id="contact">
                <Contact />
              </div>
              <div id="faq">
                <FAQ />
              </div>
            </main>
          </>
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;