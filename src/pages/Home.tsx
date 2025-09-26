import React from 'react';
import { ArrowRight, Calendar, Users, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const newsItems = [
    {
      title: 'New Education Reform Initiative Launched',
      date: '2025-01-15',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Healthcare Infrastructure Development Program',
      date: '2025-01-12',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Digital India Progress Report Released',
      date: '2025-01-10',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 bg-white p-4 rounded-lg shadow-lg transform rotate-3 z-20 hidden lg:block">
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium">Vision 2030</span>
          </div>
        </div>
        
        <div className="absolute top-32 right-16 bg-yellow-100 p-3 rounded-lg shadow-lg transform -rotate-2 z-20 hidden lg:block">
          <div className="text-xs font-medium text-gray-800">
            "Serving the Nation<br />with Dedication"
          </div>
        </div>
        
        <div className="absolute bottom-32 right-20 bg-white p-4 rounded-lg shadow-lg z-20 hidden lg:block">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-sm font-medium">Communities</div>
              <div className="text-xs text-gray-600">Served</div>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <blockquote className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
            {t('heroQuote')}
          </blockquote>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtext')}
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            {t('learnMore')}
          </button>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('aboutTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('aboutSnippet')}
              </p>
              <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                {t('readMore')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Minister"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('latestNews')}
            </h2>
            <p className="text-lg text-gray-600">Stay updated with the latest initiatives and announcements</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {t('ctaSubtext')}
          </p>
          <button className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            {t('stayInformed')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-4">{t('copyright')}</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t('termsOfService')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;