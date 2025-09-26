import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const faqCategories = [
    {
      category: 'General',
      questions: [
        {
          question: 'What are the current policy priorities of the Minister?',
          answer: 'Our current policy priorities include digital transformation, healthcare reform, education modernization, environmental protection, and economic development. We focus on inclusive growth that benefits all citizens while maintaining sustainable development practices.',
        },
        {
          question: 'How can citizens participate in the policymaking process?',
          answer: 'Citizens can participate through public consultations, online feedback platforms, town hall meetings, and by contacting our office directly. We regularly conduct stakeholder meetings and welcome input from all sections of society.',
        },
      ],
    },
    {
      category: 'Healthcare',
      questions: [
        {
          question: 'What is the Healthcare for All initiative?',
          answer: 'Healthcare for All is a comprehensive program aimed at providing accessible and affordable healthcare services to every citizen. It includes infrastructure development, digital health services, preventive care programs, and expanded insurance coverage.',
        },
        {
          question: 'How can I access the new digital health services?',
          answer: 'Digital health services can be accessed through our official health portal and mobile application. Citizens can book appointments, access medical records, consult with healthcare providers remotely, and manage prescriptions online.',
        },
      ],
    },
    {
      category: 'Education',
      questions: [
        {
          question: 'What changes are being made to the education system?',
          answer: 'We are implementing comprehensive education reforms including curriculum modernization, teacher training programs, technology integration, infrastructure development, and skill-based learning initiatives to prepare students for the 21st century.',
        },
        {
          question: 'How will the education reforms benefit students?',
          answer: 'The reforms will provide students with better learning environments, access to modern technology, practical skills training, and opportunities for holistic development. We are focusing on both academic excellence and character building.',
        },
      ],
    },
  ];

  const toggleQuestion = (index: number) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter(i => i !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  let questionIndex = 0;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to commonly asked questions about our policies, initiatives, and services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">{category.category.charAt(0)}</span>
                  </div>
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq) => {
                    const currentIndex = questionIndex++;
                    const isOpen = openQuestions.includes(currentIndex);
                    
                    return (
                      <div key={currentIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <button
                          onClick={() => toggleQuestion(currentIndex)}
                          className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <div className="border-t border-gray-200 pt-4">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact for More Questions */}
          <div className="mt-16 bg-blue-900 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-blue-100 mb-6">
              If you couldn't find the answer you were looking for, feel free to contact us directly.
            </p>
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;