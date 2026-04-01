import React, { useState } from 'react';
import { toolsConfig } from '../config/tools.config';
import ToolCard from '../components/ToolCard';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Tools', icon: '🎯' },
    { id: 'productivity', name: 'Productivity', icon: '💼' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'design', name: 'Design', icon: '🎨' },
  ];

  const filteredTools = selectedCategory === 'all' 
    ? toolsConfig 
    : toolsConfig.filter(tool => tool.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Welcome to <span className="text-indigo-600">NX STUDIO</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Professional tools to boost your productivity, creativity, and business growth
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default Home;