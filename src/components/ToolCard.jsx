import React from 'react';
import { Link } from 'react-router-dom';
import { getIconByName } from '../config/tools.config';

const ToolCard = ({ tool }) => {
  const IconComponent = getIconByName(tool.icon);

  return (
    <Link to={tool.path}>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer group h-full">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
          <IconComponent size={24} className="text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{tool.name}</h3>
        <p className="text-slate-500 text-sm mb-3">{tool.description}</p>
        <span className="text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Launch Tool →
        </span>
      </div>
    </Link>
  );
};

export default ToolCard;