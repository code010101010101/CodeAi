import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Code, Trophy, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            A New Way to <span className="text-orange-500">Learn</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/problems" 
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              Get Started <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full font-semibold transition-all">
              View Problems
            </button>
          </div>
        </motion.div>

        {/* Floating Elements Mockup */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-[#282828] rounded-t-3xl border-x border-t border-white/10 p-4 shadow-2xl hidden md:block">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
            <Code size={32} />
          </div>
          <h3 className="text-xl font-bold mb-4">Developer Tools</h3>
          <p className="text-gray-400">Our platform supports over 14 popular coding languages. Our editor is fast and feature-rich.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-bold mb-4">Fast Learning</h3>
          <p className="text-gray-400">Master data structures and algorithms with our curated study plans and detailed solutions.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500 mb-6">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold mb-4">Community</h3>
          <p className="text-gray-400">Join a community of millions of developers. Share solutions, discuss problems, and learn together.</p>
        </div>
      </section>
    </div>
  );
}
