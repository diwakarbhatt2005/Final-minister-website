import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Target, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Typed from 'typed.js';

interface AnimatedHeroProps {
  onScrollToNext: () => void;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({ onScrollToNext }) => {
  const { t } = useLanguage();
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          'Building a Stronger Future',
          'Serving with Integrity',
          'Leading with Vision',
          'Transforming Communities'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });

      return () => typed.destroy();
    }
  }, []);

  const floatingElements = [
    { icon: Target, text: 'Vision 2030', position: 'top-20 left-10', delay: 0.5 },
    { icon: Users, text: 'Communities Served', position: 'top-32 right-16', delay: 0.8 },
    { icon: Sparkles, text: 'Innovation First', position: 'bottom-32 left-20', delay: 1.1 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Proper spacing for fixed header */}
      <div className="absolute top-0 left-0 right-0 h-20 z-10"></div>
      
      {/* Background with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.85), rgba(160, 0, 28, 0.8), rgba(27, 94, 32, 0.75))'
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        />
      </motion.div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.position} bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl hidden lg:block z-20`}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              y: [0, -10, 0]
            }}
            transition={{ 
              opacity: { delay: element.delay, duration: 0.8 },
              y: { delay: element.delay + 0.5, duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.1, 
              rotateY: 10,
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
            }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <div className="text-white/80 text-sm">Excellence in Service</div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-white drop-shadow-lg">
              <span ref={typedRef}></span>
            </span>
          </motion.h1>
        </motion.div>

        <motion.blockquote
          className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed mb-8 italic"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="text-white/95 drop-shadow-md">"{t('heroQuote')}"</span>
        </motion.blockquote>

        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {t('heroSubtext')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <motion.button
            className="group relative px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl overflow-hidden transition-colors btn-accent"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(255, 215, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onScrollToNext}
          >
            <span>{t('learnMore')}</span>
          </motion.button>

          <motion.button
            className="group px-10 py-5 border-2 rounded-2xl font-bold text-xl backdrop-blur-sm transition-all duration-300 text-white"
            style={{
              borderColor: 'rgba(255, 215, 0, 0.6)',
              background: 'rgba(255, 215, 0, 0.1)'
            }}
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(255, 215, 0, 0.8)",
              background: "rgba(255, 215, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="group-hover:text-white transition-colors">Explore Initiatives</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.button
          onClick={onScrollToNext}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm mb-2 group-hover:text-white transition-colors">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <ArrowDown className="w-5 h-5 mt-2 group-hover:text-white transition-colors" />
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default AnimatedHero;