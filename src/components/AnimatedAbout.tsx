import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
const AnimatedAbout: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const achievements = [
    { icon: Award, title: 'Excellence in Public Service', year: '2023', count: 15 },
    { icon: Users, title: 'Community Leadership Award', year: '2022', count: 25 },
    { icon: Globe, title: 'International Cooperation Medal', year: '2021', count: 8 },
  ];

  const stats = [
    { number: 2500000, label: 'Citizens Served', suffix: '+' },
    { number: 150, label: 'Policies Implemented', suffix: '+' },
    { number: 95, label: 'Satisfaction Rate', suffix: '%' },
    { number: 50, label: 'Awards Received', suffix: '+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section 
      id="about" 
      className="pt-8 md:pt-16 pb-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--background-cream), var(--background-light))'
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(255, 215, 0, 0.3))'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.2), rgba(255, 215, 0, 0.3))'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Image and Stats */}
            <motion.div variants={itemVariants} className="space-y-8">
            <div className="relative">
              <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl minister-portrait mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              >
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Minister"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                background: 'linear-gradient(to top, rgba(139, 0, 0, 0.3), transparent)'
                }}
              />
              
              {/* Floating Badge */}
              <motion.div
                className="absolute top-6 right-6 backdrop-blur-xl p-4 rounded-2xl border"
                style={{
                background: 'rgba(255, 215, 0, 0.2)',
                borderColor: 'rgba(255, 215, 0, 0.4)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Sparkles className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
              </motion.div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="professional-card p-6 text-center group transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                  }}
                >
                  <motion.div
                    className="text-3xl font-bold text-gradient mb-2"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      {stat.number.toLocaleString()}{stat.suffix}
                    </motion.span>
                  </motion.div>
                  <div 
                    className="font-medium transition-colors"
                    style={{ 
                      color: 'var(--neutral-light-gray)',
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="text-gray-900">
                <span style={{ color: 'var(--text-dark)' }}>
                  About the Minister
                </span>
                </span>
              </motion.h2>

              <motion.div
                className="prose prose-lg space-y-6"
                style={{ color: 'var(--neutral-warm-gray)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="text-xl leading-relaxed">
                  With over two decades of dedicated public service, our Minister has been at the forefront 
                  of transformative change in our nation. Born and raised in the heart of our country, 
                  they understand the challenges and aspirations of every citizen.
                </p>
                <p className="text-lg leading-relaxed">
                  Their journey began as a grassroots activist, fighting for social justice and equality. 
                  Through perseverance and unwavering commitment to democratic values, they rose through 
                  the ranks to become one of our nation's most respected leaders.
                </p>
              </motion.div>
            </div>

            {/* Achievements */}
            <motion.div
              className="grid gap-4"
              variants={containerVariants}
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group professional-card p-6 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02,
                      x: 10,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary-maroon), var(--accent-gold))'
                        }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 
                          className="font-bold text-lg transition-colors"
                          style={{ 
                            color: 'var(--text-dark)',
                          }}
                        >
                          {achievement.title}
                        </h3>
                        <p style={{ color: 'var(--neutral-light-gray)' }}>{achievement.year}</p>
                      </div>
                      <motion.div
                        className="text-2xl font-bold"
                        style={{ color: 'var(--accent-gold)' }}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, type: "spring", bounce: 0.5 }}
                      >
                        {achievement.count}+
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
};

export default AnimatedAbout;