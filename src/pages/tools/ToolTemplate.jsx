import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { toolsConfig, getIconByName } from '../../config/tools.config';
import { Construction } from 'lucide-react';

const ToolTemplate = () => {
  const { toolId } = useParams();
  const tool = toolsConfig.find(t => t.id === toolId);
  
  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
        <Link to="/" className="text-indigo-600">&larr; Back to Home</Link>
      </div>
    );
  }

  const IconComponent = getIconByName(tool.icon);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 w-full">
      <Link to="/" className="inline-flex items-center text-indigo-600 mb-8 font-medium hover:underline">
        ← Back to Home
      </Link>
      
      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <IconComponent size={40} className="text-indigo-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {tool.name}
        </h1>
        <p className="text-slate-500 text-lg mb-6">{tool.description}</p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-2 text-amber-700 mb-3">
            <Construction size={24} />
            <span className="font-semibold">Coming Soon!</span>
          </div>
          <p className="text-amber-600">
            We're working hard to bring you this tool. Stay tuned for updates!
          </p>
        </div>
        
        <div className="border-t border-slate-200 pt-6">
          <p className="text-slate-400 text-sm">
            Want early access? <button className="text-indigo-600 hover:underline">Subscribe to updates</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolTemplate;