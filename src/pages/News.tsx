import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'New Education Reform Initiative Launched',
      excerpt: 'Comprehensive reform program aimed at modernizing education infrastructure and curriculum nationwide.',
      date: '2025-01-15',
      time: '10:30 AM',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Education',
    },
    {
      id: 2,
      title: 'Healthcare Infrastructure Development Program Announced',
      excerpt: 'Major investment in healthcare facilities and digital health services across rural and urban areas.',
      date: '2025-01-12',
      time: '2:15 PM',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Healthcare',
    },
    {
      id: 3,
      title: 'Digital India Progress Report Released',
      excerpt: 'Latest achievements in digital transformation and future roadmap for technology adoption.',
      date: '2025-01-10',
      time: '11:00 AM',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Technology',
    },
    {
      id: 4,
      title: 'Environmental Protection Act Amendment Passed',
      excerpt: 'Strengthened environmental regulations to combat climate change and protect natural resources.',
      date: '2025-01-08',
      time: '3:45 PM',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Environment',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Public Consultation on Healthcare Policy',
      date: '2025-01-25',
      time: '2:00 PM',
      location: 'National Convention Center',
    },
    {
      title: 'Education Summit 2025',
      date: '2025-02-02',
      time: '9:00 AM',
      location: 'Delhi University Auditorium',
    },
    {
      title: 'Digital Infrastructure Launch',
      date: '2025-02-10',
      time: '11:30 AM',
      location: 'India Gate Lawns',
    },
  ];

  return (
    <div className="pt-8 md:pt-12">
      {/* Header */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              News & Events
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest policy announcements, initiatives, and upcoming events.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* News Articles */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest News</h2>
              <div className="space-y-8">
                {newsItems.map((item) => (
                  <article key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {item.category}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.date}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {item.time}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {item.excerpt}
                        </p>
                        <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date} at {event.time}
                        </div>
                        <div>{event.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-900 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-blue-100 mb-4">
                  Subscribe to our newsletter for the latest policy updates and announcements.
                </p>
                <button className="w-full bg-white text-blue-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;