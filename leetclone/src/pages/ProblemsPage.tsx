import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, PlayCircle, Filter, ChevronDown, Clock, ChevronUp } from 'lucide-react';
import { problems } from '@/src/constants';
import { cn } from '@/src/lib/utils';

export default function ProblemsPage() {
  const [problemStatuses, setProblemStatuses] = useState<Record<string, string>>({});
  
  // Filter states
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showTopicTag, setShowTopicTag] = useState(true);
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  useEffect(() => {
    const statuses: Record<string, string> = {};
    problems.forEach(p => {
      const status = localStorage.getItem(`problem-status-${p.id}`);
      if (status) {
        statuses[p.id] = status;
      }
    });
    setProblemStatuses(statuses);
  }, []);

  // Dynamically extract filter options
  const filterOptions = useMemo(() => {
    const companiesMap = new Map<string, number>();
    const topicsMap = new Map<string, number>();
    
    problems.forEach(p => {
      if (p.companies) {
        p.companies.forEach(c => {
          companiesMap.set(c, (companiesMap.get(c) || 0) + 1);
        });
      }
      
      const pTopics = p.topics || [p.category];
      pTopics.forEach(t => {
        topicsMap.set(t, (topicsMap.get(t) || 0) + 1);
      });
    });

    return {
      companies: Array.from(companiesMap.entries()).sort((a, b) => b[1] - a[1]),
      topics: Array.from(topicsMap.entries()).sort((a, b) => b[1] - a[1]),
      difficulties: ['Basic', 'Easy', 'Medium', 'Hard'],
      statuses: ['Solved', 'Unsolved', 'Attempted']
    };
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const status = problemStatuses[p.id] || 'unsolved';
      const mappedStatus = status === 'solved' ? 'Solved' : status === 'attempting' ? 'Attempted' : 'Unsolved';

      if (selectedCompanies.length > 0 && (!p.companies || !selectedCompanies.some(c => p.companies.includes(c)))) return false;
      
      const pTopics = p.topics || [p.category];
      if (selectedTopics.length > 0 && !selectedTopics.some(t => pTopics.includes(t))) return false;
      
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(p.difficulty)) return false;
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(mappedStatus)) return false;
      
      return true;
    });
  }, [problems, problemStatuses, selectedCompanies, selectedTopics, selectedDifficulties, selectedStatuses]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const clearAllFilters = () => {
    setSelectedCompanies([]);
    setSelectedTopics([]);
    setSelectedDifficulties([]);
    setSelectedStatuses([]);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar - Filters */}
        <div className="w-full md:w-64 lg:w-72 shrink-0 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full text-xs font-bold transition-colors"
            >
              CLEAR ALL
            </button>
          </div>

          {/* Companies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">Companies</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
              {(showAllCompanies ? filterOptions.companies : filterOptions.companies.slice(0, 5)).map(([company, count]) => (
                <label key={company} className={cn(
                  "flex items-center gap-3 p-2 rounded cursor-pointer transition-colors",
                  selectedCompanies.includes(company) ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5"
                )}>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-500 bg-transparent text-blue-500 focus:ring-0 focus:ring-offset-0"
                    checked={selectedCompanies.includes(company)}
                    onChange={() => toggleFilter(setSelectedCompanies, company)}
                  />
                  <span className="text-sm">{company} ({count})</span>
                </label>
              ))}
              {filterOptions.companies.length > 5 && (
                <button
                  onClick={() => setShowAllCompanies(!showAllCompanies)}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors p-2 w-full justify-center mt-2"
                >
                  {showAllCompanies ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>Show More <ChevronDown size={16} /></>
                  )}
                </button>
              )}
              {filterOptions.companies.length === 0 && (
                <div className="text-xs text-gray-500 italic p-2">No companies found</div>
              )}
            </div>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">Topics</h3>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
              <span className="text-sm text-gray-300">Show topic tag</span>
              <button 
                onClick={() => setShowTopicTag(!showTopicTag)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative",
                  showTopicTag ? "bg-blue-500" : "bg-gray-600"
                )}
              >
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform",
                  showTopicTag ? "translate-x-5" : "translate-x-1"
                )} />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
              {filterOptions.topics.map(([topic, count]) => (
                <label key={topic} className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5 transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-500 bg-transparent text-blue-500 focus:ring-0 focus:ring-offset-0"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => toggleFilter(setSelectedTopics, topic)}
                  />
                  <span className="text-sm">{topic} ({count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">Difficulty</h3>
            </div>
            <div className="space-y-2">
              {filterOptions.difficulties.map(diff => (
                <label key={diff} className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5 transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-500 bg-transparent text-blue-500 focus:ring-0 focus:ring-offset-0"
                    checked={selectedDifficulties.includes(diff)}
                    onChange={() => toggleFilter(setSelectedDifficulties, diff)}
                  />
                  <span className="text-sm">{diff}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">Status</h3>
            </div>
            <div className="space-y-2">
              {filterOptions.statuses.map(status => (
                <label key={status} className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5 transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-500 bg-transparent text-blue-500 focus:ring-0 focus:ring-offset-0"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => toggleFilter(setSelectedStatuses, status)}
                  />
                  <span className="text-sm">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="bg-[#282828] hover:bg-[#333] px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-white/5 transition-colors">
                Lists <ChevronDown size={14} />
              </button>
              <button className="bg-[#282828] hover:bg-[#333] px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-white/5 transition-colors">
                Difficulty <ChevronDown size={14} />
              </button>
              <button className="bg-[#282828] hover:bg-[#333] px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-white/5 transition-colors">
                Status <ChevronDown size={14} />
              </button>
              <button className="bg-[#282828] hover:bg-[#333] px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-white/5 transition-colors">
                Tags <ChevronDown size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Filter size={18} />
              </button>
              <button className="bg-green-500/10 text-green-500 hover:bg-green-500/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                Pick One
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#282828]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase text-gray-500 font-semibold">
                  <th className="px-4 py-3 w-12">Status</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Acceptance</th>
                  <th className="px-4 py-3">Difficulty</th>
                  <th className="px-4 py-3 w-12">Solution</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredProblems.length > 0 ? filteredProblems.map((problem, idx) => {
                  const status = problemStatuses[problem.id] || 'todo';
                  return (
                  <tr 
                    key={problem.id} 
                    className={cn(
                      "hover:bg-white/5 transition-colors border-b border-white/5 last:border-0",
                      idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    )}
                  >
                    <td className="px-4 py-4">
                      {status === 'solved' ? (
                        <CheckCircle2 size={18} className="text-green-500" />
                      ) : status === 'attempting' ? (
                        <Clock size={18} className="text-yellow-500" />
                      ) : (
                        <Circle size={18} className="text-gray-600" />
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/problems/${problem.id}`} className="hover:text-blue-400 transition-colors font-medium">
                        {problem.order}. {problem.title}
                      </Link>
                      {showTopicTag && (problem.topics || [problem.category]).map(t => (
                        <span key={t} className="ml-2 text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
                          {t}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-4 text-gray-400">
                      {problem.acceptance}
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        "font-medium",
                        problem.difficulty === 'Easy' && "text-green-500",
                        problem.difficulty === 'Medium' && "text-yellow-500",
                        problem.difficulty === 'Hard' && "text-red-500"
                      )}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <PlayCircle size={18} className="text-blue-500 cursor-pointer hover:text-blue-400" />
                    </td>
                  </tr>
                )}) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No problems found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
