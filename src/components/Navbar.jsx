import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Navbar = () => (
  <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors">
        <Zap className="text-indigo-600" /> NX STUDIO
      </Link>
      <div className="flex gap-4">
        <span className="text-sm text-slate-400">⚡ 40+ Tools</span>
      </div>
    </div>
  </nav>
);

export default Navbar;