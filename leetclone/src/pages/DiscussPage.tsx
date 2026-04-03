import React from 'react';
import { MessageSquare, ThumbsUp, Eye, Search, ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const posts = [
  {
    id: 1,
    title: "Google | L3 | Bangalore | Dec 2025 [Selected]",
    author: "coder_pro",
    tags: ["Google", "Interview Experience"],
    views: "12.4K",
    likes: 452,
    comments: 89,
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Dynamic Programming Patterns for Interviews",
    author: "algo_master",
    tags: ["Dynamic Programming", "Tutorial"],
    views: "45.1K",
    likes: 1204,
    comments: 156,
    time: "5 hours ago"
  },
  {
    id: 3,
    title: "Amazon SDE2 Interview Questions - 2026",
    author: "interview_prep",
    tags: ["Amazon", "SDE2"],
    views: "8.2K",
    likes: 215,
    comments: 42,
    time: "1 day ago"
  },
  {
    id: 4,
    title: "How to stay motivated while solving 500+ problems?",
    author: "persistent_dev",
    tags: ["Motivation", "Career"],
    views: "5.6K",
    likes: 312,
    comments: 67,
    time: "2 days ago"
  }
];

export default function DiscussPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Discuss</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Plus size={18} /> New Post
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 bg-[#282828] border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3">
              <Search size={18} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search topics, solutions..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <button className="bg-[#282828] border border-white/10 px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/5 transition-colors">
              Hot <ChevronDown size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#282828] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all cursor-pointer group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                      {post.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="hover:text-gray-300 transition-colors">@{post.author}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-gray-500">
                    <div className="flex flex-col items-center gap-1">
                      <ThumbsUp size={16} className="group-hover:text-orange-500 transition-colors" />
                      <span className="text-[10px]">{post.likes}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <MessageSquare size={16} className="group-hover:text-blue-500 transition-colors" />
                      <span className="text-[10px]">{post.comments}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Eye size={16} className="group-hover:text-white transition-colors" />
                      <span className="text-[10px]">{post.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#282828] border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">Categories</h3>
            <div className="space-y-2">
              {["Interview Experience", "Interview Questions", "Compensation", "Career", "Study Guide"].map(cat => (
                <div key={cat} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center justify-between group">
                  {cat}
                  <ChevronDown size={14} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-orange-500 mb-2">Premium Benefits</h3>
            <p className="text-xs text-gray-400 mb-4">Get access to exclusive interview questions from top companies.</p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-xs font-bold transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
