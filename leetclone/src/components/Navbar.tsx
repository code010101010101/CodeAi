import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Bell, Flame, Search, Menu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Navbar = () => {
  const location = useLocation();
  const isEditor = location.pathname.startsWith('/problems/');

  return (
    <nav className={cn(
      "flex items-center justify-between px-4 h-12 border-b border-white/10 bg-[#282828] text-gray-300",
      isEditor && "bg-[#1a1a1a]"
    )}>
      <div className="flex items-center gap-6 h-full">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 object-contain" referrerPolicy="no-referrer" />
        </Link>
        
        <div className="hidden md:flex items-center p-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md -skew-x-12 ml-2">
          {[
            { path: '/explore', label: 'Explore', activeColor: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]', hoverColor: 'hover:text-blue-400 hover:bg-blue-500/10' },
            { path: '/problems', label: 'Problems', activeColor: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]', hoverColor: 'hover:text-orange-400 hover:bg-orange-500/10' },
            { path: '/contest', label: 'Contest', activeColor: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]', hoverColor: 'hover:text-red-400 hover:bg-red-500/10' },
            { path: '/discuss', label: 'Discuss', activeColor: 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]', hoverColor: 'hover:text-green-400 hover:bg-green-500/10' },
            { path: '/interview', label: 'Interview', activeColor: 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]', hoverColor: 'hover:text-yellow-400 hover:bg-yellow-500/10' },
            { path: '/store', label: 'Store', activeColor: 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]', hoverColor: 'hover:text-purple-400 hover:bg-purple-500/10' },
          ].map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={cn(
                  "relative px-4 py-1.5 rounded-lg transition-all duration-300 flex items-center justify-center",
                  isActive 
                    ? `text-white ${item.activeColor}`
                    : `text-gray-400 ${item.hoverColor}`
                )}
              >
                <span className="block skew-x-12 uppercase tracking-widest font-bold text-[11px]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center p-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md -skew-x-12 transition-all focus-within:bg-white/10 focus-within:border-white/20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg skew-x-12">
            <Search size={14} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="SEARCH" 
              className="bg-transparent border-none outline-none text-[11px] font-bold tracking-widest uppercase w-24 focus:w-40 transition-all text-gray-200 placeholder:text-gray-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Bell size={18} className="cursor-pointer hover:text-white" />
          <div className="flex items-center gap-1 text-orange-500">
            <Flame size={18} fill="currentColor" />
            <span className="text-xs font-bold">0</span>
          </div>
          <Link to="/profile" className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden border border-white/20">
            <User size={16} />
          </Link>
          <button className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-xs font-medium transition-colors">
            Premium
          </button>
        </div>
      </div>
    </nav>
  );
};
