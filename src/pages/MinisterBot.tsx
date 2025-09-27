import React from 'react';
import { motion } from 'framer-motion';
import MinisterBot from '../components/AnimatedChatbot';

const MinisterBotPage: React.FC = () => {

  return (
    <motion.section
      id="ministerbot"
      className="min-h-screen bg-gray-100 pt-24 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 pt-4"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Minister Bot
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your AI assistant for government policies, initiatives, and services. Get instant help with policy documents, citizen services, and official information.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="h-[calc(100vh-200px)] min-h-[600px]"
        >
          <MinisterBot />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MinisterBotPage;