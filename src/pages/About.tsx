import React, { useState } from 'react';
import { MessageCircle, Send, Award, Users, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Chatbot from '../components/Chatbot';

const About: React.FC = () => {
  const { t } = useLanguage();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const achievements = [
    { icon: Award, title: 'Excellence in Public Service', year: '2023' },
    { icon: Users, title: 'Community Leadership Award', year: '2022' },
    { icon: Globe, title: 'International Cooperation Medal', year: '2021' },
  ];

  return (
    <div className="pt-16">
      {/* Minister's Bio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Minister"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About the Minister
              </h1>
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  With over two decades of dedicated public service, our Minister has been at the forefront 
                  of transformative change in our nation. Born and raised in the heart of our country, 
                  they understand the challenges and aspirations of every citizen.
                </p>
                <p>
                  Their journey began as a grassroots activist, fighting for social justice and equality. 
                  Through perseverance and unwavering commitment to democratic values, they rose through 
                  the ranks to become one of our nation's most respected leaders.
                </p>
                <p>
                  Today, as Minister, they continue to champion policies that promote inclusive growth, 
                  sustainable development, and social harmony. Their vision extends beyond traditional 
                  boundaries, embracing innovation while preserving our cultural heritage.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="text-center p-6 bg-blue-50 rounded-lg">
                      <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.year}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('chatWithBot')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('chatIntro')}
            </p>
            
            {!isChatbotOpen ? (
              <button
                onClick={() => setIsChatbotOpen(true)}
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('startConversation')}
              </button>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Chatbot />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Our Vision
          </h2>
          <blockquote className="text-xl md:text-2xl text-blue-100 italic leading-relaxed">
            "To build a nation where every citizen has equal opportunities to thrive, 
            where innovation drives progress, and where our rich heritage guides us 
            toward a sustainable and prosperous future for generations to come."
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default About;