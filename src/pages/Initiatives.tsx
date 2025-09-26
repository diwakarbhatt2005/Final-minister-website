import React from 'react';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';

const Initiatives: React.FC = () => {
  const initiatives = [
    {
      title: 'Digital India 2.0',
      description: 'Transforming India into a digitally empowered society and knowledge economy.',
      status: 'Active',
      progress: 75,
      documents: ['Policy Brief', 'Implementation Plan', 'Progress Report'],
    },
    {
      title: 'Healthcare for All',
      description: 'Ensuring accessible and affordable healthcare services for every citizen.',
      status: 'Active',
      progress: 60,
      documents: ['Healthcare Policy', 'Budget Allocation', 'Infrastructure Plan'],
    },
    {
      title: 'Education Reform Initiative',
      description: 'Modernizing the education system to meet 21st-century challenges.',
      status: 'Planning',
      progress: 30,
      documents: ['Education Policy Draft', 'Stakeholder Consultation'],
    },
  ];

  return (
    <div className="pt-24">
      <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--background-cream), var(--background-light))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Policy Initiatives
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive policy initiatives designed to drive progress and create lasting positive change for our nation.
            </p>
          </div>

          <div className="space-y-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">{initiative.title}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          initiative.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {initiative.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{initiative.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-blue-600">{initiative.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${initiative.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Related Documents
                      </h3>
                      <ul className="space-y-2">
                        {initiative.documents.map((doc, docIndex) => (
                          <li key={docIndex} className="flex items-center text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            <span className="hover:text-blue-600 cursor-pointer">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-end">
                      <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                        Learn More
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Initiatives;