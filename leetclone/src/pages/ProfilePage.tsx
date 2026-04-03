import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  MapPin, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  Twitter,
  ChevronRight,
  Flame,
  Trophy,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Star,
  Edit2,
  Save,
  X,
  Eye,
  Target,
  Award,
  Code2,
  Activity,
  Zap,
  TrendingUp,
  BookOpen,
  Globe
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { problems } from '@/src/constants';

const PLATFORMS = [
  { id: 'leetcode', name: 'LeetCode', color: 'text-yellow-500' },
  { id: 'codestudio', name: 'CodeStudio', color: 'text-orange-500' },
  { id: 'geeksforgeeks', name: 'GeeksForGeeks', color: 'text-green-500' },
  { id: 'interviewbit', name: 'InterviewBit', color: 'text-cyan-500' },
  { id: 'codechef', name: 'CodeChef', color: 'text-amber-700' },
  { id: 'codeforces', name: 'CodeForces', color: 'text-blue-500' },
  { id: 'hackerrank', name: 'HackerRank', color: 'text-green-400' },
  { id: 'atcoder', name: 'AtCoder', color: 'text-gray-300' },
  { id: 'other', name: 'Other Platform', color: 'text-pink-500' },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: localStorage.getItem('profileName') || 'John Doe',
    username: localStorage.getItem('profileUsername') || '@johndoe123',
    location: localStorage.getItem('profileLocation') || 'San Francisco, CA',
    website: localStorage.getItem('profileWebsite') || 'johndoe.dev',
    github: localStorage.getItem('profileGithub') || 'github.com/johndoe',
  });

  const [stats, setStats] = useState({
    views: parseInt(localStorage.getItem('profileViews') || '0', 10),
    solutions: parseInt(localStorage.getItem('solutionsCount') || '0', 10),
    maxStreak: parseInt(localStorage.getItem('maxStreak') || '0', 10),
    hoursCoded: Math.floor(parseInt(localStorage.getItem('secondsCoded') || '0', 10) / 3600),
  });

  const [solvedStats, setSolvedStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    totalEasy: problems.filter(p => p.difficulty === 'Easy').length,
    totalMedium: problems.filter(p => p.difficulty === 'Medium').length,
    totalHard: problems.filter(p => p.difficulty === 'Hard').length,
  });

  const [topSkills, setTopSkills] = useState<[string, number][]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<typeof problems>([]);

  const [linkedPlatforms, setLinkedPlatforms] = useState({
    leetcode: localStorage.getItem('platform_leetcode') || '',
    codestudio: localStorage.getItem('platform_codestudio') || '',
    geeksforgeeks: localStorage.getItem('platform_geeksforgeeks') || '',
    interviewbit: localStorage.getItem('platform_interviewbit') || '',
    codechef: localStorage.getItem('platform_codechef') || '',
    codeforces: localStorage.getItem('platform_codeforces') || '',
    hackerrank: localStorage.getItem('platform_hackerrank') || '',
    atcoder: localStorage.getItem('platform_atcoder') || '',
    other: localStorage.getItem('platform_other') || '',
  });

  const [platformInputs, setPlatformInputs] = useState({ ...linkedPlatforms });
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(false);

  const handleLinkPlatform = (key: string) => {
    const url = platformInputs[key as keyof typeof platformInputs];
    localStorage.setItem(`platform_${key}`, url);
    setLinkedPlatforms(prev => ({ ...prev, [key]: url }));
  };

  const handleUnlinkPlatform = (key: string) => {
    localStorage.removeItem(`platform_${key}`);
    setLinkedPlatforms(prev => ({ ...prev, [key]: '' }));
    setPlatformInputs(prev => ({ ...prev, [key]: '' }));
  };

  useEffect(() => {
    // Increment profile views
    const currentViews = parseInt(localStorage.getItem('profileViews') || '0', 10);
    const newViews = currentViews + 1;
    localStorage.setItem('profileViews', newViews.toString());
    setStats(s => ({ ...s, views: newViews }));

    // Calculate solved problems and skills
    let easy = 0, medium = 0, hard = 0;
    const solved: typeof problems = [];
    const topicCounts: Record<string, number> = {};

    problems.forEach(p => {
      if (localStorage.getItem(`problem-status-${p.id}`) === 'solved') {
        if (p.difficulty === 'Easy') easy++;
        if (p.difficulty === 'Medium') medium++;
        if (p.difficulty === 'Hard') hard++;
        solved.push(p);
        
        p.topics.forEach(t => {
          topicCounts[t] = (topicCounts[t] || 0) + 1;
        });
      }
    });

    setSolvedStats(prev => ({
      ...prev,
      total: easy + medium + hard,
      easy,
      medium,
      hard
    }));

    setRecentSubmissions(solved.reverse().slice(0, 5));
    setTopSkills(Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 6));
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingPlatforms(true);
      let activePlatforms = 0;
      const details: any[] = [];

      for (const [key, rawUrl] of Object.entries(linkedPlatforms)) {
        const url = rawUrl as string;
        if (!url) continue;
        
        let solved: number | string = 0;
        let rating: number | string = 0;
        let username = '';
        let platformName = PLATFORMS.find(p => p.id === key)?.name || key;

        try {
          if (key === 'leetcode') {
            const match = url.match(/leetcode\.com\/(?:u\/)?([^\/?]+)/);
            if (match) {
              username = match[1];
              const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
              const data = await res.json();
              if (data && data.totalSolved !== undefined) {
                solved = data.totalSolved || 0;
                rating = data.ranking || 0;
              }
            }
          } else if (key === 'codeforces') {
            const match = url.match(/codeforces\.com\/profile\/([^\/?]+)/);
            if (match) {
              username = match[1];
              const res = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
              const data = await res.json();
              if (data.status === 'OK' && data.result.length > 0) {
                rating = data.result[0].rating || 0;
              }
            }
          } else if (key === 'geeksforgeeks') {
             const match = url.match(/geeksforgeeks\.org\/user\/([^\/?]+)/);
             if (match) {
               username = match[1];
               const res = await fetch(`https://geeks-for-geeks-api.vercel.app/${username}`);
               const data = await res.json();
               if (data.info && data.info.totalProblemsSolved) {
                 solved = data.info.totalProblemsSolved;
               }
             }
          } else if (key === 'codechef') {
             const match = url.match(/codechef\.com\/users\/([^\/?]+)/);
             if (match) {
               username = match[1];
               const res = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
               const data = await res.json();
               if (data.currentRating) {
                 rating = data.currentRating;
               }
             }
          } else if (key === 'other') {
             // For other platforms, we just display the URL and maybe try to fetch basic metadata
             solved = 'N/A';
             rating = 'N/A';
             try {
               const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
               const data = await res.json();
               if (data.status === 'success' && data.data.title) {
                 platformName = data.data.title;
               }
             } catch (e) {
               // Ignore metadata fetch errors
             }
          }
        } catch (err) {
          console.error(`Error fetching ${key} data:`, err);
        }

        activePlatforms++;

        details.push({
          id: key,
          platform: platformName,
          solved: solved > 0 ? solved : (solved === 'N/A' ? 'N/A' : 0),
          rating: rating > 0 ? rating : (rating === 'N/A' ? 'N/A' : 'N/A'),
          url
        });
      }

      if (activePlatforms > 0) {
        setPlatformStats({
          activePlatforms,
          details
        });
      } else {
        setPlatformStats(null);
      }
      setIsLoadingPlatforms(false);
    };

    fetchStats();
  }, [linkedPlatforms]);

  const handleSaveProfile = () => {
    localStorage.setItem('profileName', profile.name);
    localStorage.setItem('profileUsername', profile.username);
    localStorage.setItem('profileLocation', profile.location);
    localStorage.setItem('profileWebsite', profile.website);
    localStorage.setItem('profileGithub', profile.github);
    setIsEditing(false);
  };

  // Derived stats
  const reputation = solvedStats.total * 10 + stats.solutions * 5;
  const rank = Math.max(1, 100000 - (solvedStats.total * 100) - (stats.solutions * 50));
  const contestRating = solvedStats.total > 20 ? 'Top 1%' : solvedStats.total > 10 ? 'Top 5%' : solvedStats.total > 5 ? 'Top 10%' : 'Top 50%';

  // SVG calculations for the circle
  const circumference = 440; // 2 * pi * r (r=70)
  
  const easyPercent = solvedStats.total > 0 ? solvedStats.easy / solvedStats.total : 0;
  const mediumPercent = solvedStats.total > 0 ? solvedStats.medium / solvedStats.total : 0;
  const hardPercent = solvedStats.total > 0 ? solvedStats.hard / solvedStats.total : 0;

  const easyOffset = circumference - (easyPercent * circumference);
  const mediumOffset = circumference - (mediumPercent * circumference);
  const hardOffset = circumference - (hardPercent * circumference);

  // Dynamic Badges
  const badges = [];
  if (solvedStats.total >= 1) badges.push({ name: 'First Blood', icon: <Target className="text-red-500" size={24} />, desc: 'Solved first problem', color: 'bg-red-500/10 border-red-500/20' });
  if (solvedStats.total >= 10) badges.push({ name: 'Getting Serious', icon: <Zap className="text-yellow-500" size={24} />, desc: 'Solved 10 problems', color: 'bg-yellow-500/10 border-yellow-500/20' });
  if (solvedStats.total >= 50) badges.push({ name: 'Half Century', icon: <Award className="text-purple-500" size={24} />, desc: 'Solved 50 problems', color: 'bg-purple-500/10 border-purple-500/20' });
  if (stats.maxStreak >= 3) badges.push({ name: 'On Fire', icon: <Flame className="text-orange-500" size={24} />, desc: '3 day streak', color: 'bg-orange-500/10 border-orange-500/20' });
  if (stats.hoursCoded >= 10) badges.push({ name: 'Dedicated', icon: <Clock className="text-blue-500" size={24} />, desc: '10 hours coded', color: 'bg-blue-500/10 border-blue-500/20' });
  if (badges.length === 0) badges.push({ name: 'Novice', icon: <Star className="text-gray-400" size={24} />, desc: 'Just getting started', color: 'bg-gray-500/10 border-gray-500/20' });

  return (
    <div className="min-h-screen bg-[#111111] text-gray-300 pb-12">
      {/* Banner */}
      <div className="h-48 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-[#1e1e1e] shadow-2xl mb-4 flex items-center justify-center text-white text-4xl font-bold relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                
                {isEditing ? (
                  <div className="w-full space-y-3 mb-2">
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={e => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-center text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Name"
                    />
                    <input 
                      type="text" 
                      value={profile.username}
                      onChange={e => setProfile({...profile, username: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-gray-400 text-center text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Username"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h1>
                    <p className="text-sm text-gray-400 font-medium">{profile.username}</p>
                  </>
                )}
                
                <div className="mt-4 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
                  <Trophy size={14} className="text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400">Rank {rank.toLocaleString()}</span>
                </div>
              </div>

              {isEditing ? (
                <div className="flex gap-2 mb-6">
                  <button 
                    onClick={handleSaveProfile}
                    className="flex-1 bg-green-500 text-white hover:bg-green-600 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white/5 text-gray-300 hover:bg-white/10 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white py-2.5 rounded-xl text-sm font-medium transition-all mb-6 flex items-center justify-center gap-2 border border-white/5 hover:border-white/10"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-gray-400 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <MapPin size={16} className="text-gray-300" /> 
                  </div>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.location}
                      onChange={e => setProfile({...profile, location: e.target.value})}
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Location"
                    />
                  ) : (
                    <span className="truncate group-hover:text-gray-200 transition-colors">{profile.location || 'Add location'}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-400 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <LinkIcon size={16} className="text-gray-300" /> 
                  </div>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.website}
                      onChange={e => setProfile({...profile, website: e.target.value})}
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Website"
                    />
                  ) : (
                    <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-400 transition-colors">{profile.website || 'Add website'}</a>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-400 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Github size={16} className="text-gray-300" /> 
                  </div>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.github}
                      onChange={e => setProfile({...profile, github: e.target.value})}
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="GitHub URL"
                    />
                  ) : (
                    <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="truncate hover:text-blue-400 transition-colors">{profile.github || 'Add GitHub'}</a>
                  )}
                </div>
              </div>

              <hr className="my-6 border-white/5" />

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Community Stats</h3>
                <div className="flex items-center justify-between text-sm group">
                  <span className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors"><ThumbsUp size={16} className="text-blue-400" /> Likes</span>
                  <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">{(solvedStats.total * 2).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm group">
                  <span className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors"><Eye size={16} className="text-purple-400" /> Views</span>
                  <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">{stats.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm group">
                  <span className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors"><CheckCircle2 size={16} className="text-green-400" /> Solutions</span>
                  <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">{stats.solutions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm group">
                  <span className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors"><Star size={16} className="text-yellow-400" /> Reputation</span>
                  <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">{reputation.toLocaleString()}</span>
                </div>
              </div>

              {topSkills.length > 0 && (
                <>
                  <hr className="my-6 border-white/5" />
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Top Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {topSkills.map(([skill, count], idx) => (
                        <div key={skill} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-300 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default">
                          {skill}
                          <span className="text-gray-500 bg-black/30 px-1.5 py-0.5 rounded-md">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Stats & Activity */}
          <div className="lg:col-span-9 space-y-6 mt-8 lg:mt-0">
            {/* Top Stats Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp size={48} className="text-blue-500" />
                </div>
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                  <Activity size={20} />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{rank.toLocaleString()}</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Global Rank</div>
              </div>
              
              <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Flame size={48} className="text-orange-500" />
                </div>
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-3 group-hover:scale-110 transition-transform">
                  <Flame size={20} fill="currentColor" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{stats.maxStreak}</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Max Streak</div>
              </div>

              <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Trophy size={48} className="text-yellow-500" />
                </div>
                <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400 mb-3 group-hover:scale-110 transition-transform">
                  <Trophy size={20} />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{contestRating}</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Contest Rating</div>
              </div>

              <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Clock size={48} className="text-purple-500" />
                </div>
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                  <Clock size={20} />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{stats.hoursCoded}</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Hours Coded</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Solved Problems Breakdown */}
              <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Code2 className="text-blue-400" size={20} />
                    Solved Problems
                  </h3>
                  <span className="text-xs font-medium bg-white/5 px-2.5 py-1 rounded-full text-gray-400">
                    {((solvedStats.total / (solvedStats.totalEasy + solvedStats.totalMedium + solvedStats.totalHard)) * 100).toFixed(1)}% Completion
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative w-36 h-36 shrink-0">
                    <svg className="w-full h-full transform -rotate-90 drop-shadow-xl">
                      <circle cx="72" cy="72" r="62" fill="transparent" stroke="#2a2a2a" strokeWidth="8" />
                      {solvedStats.total > 0 && (
                        <>
                          <circle cx="72" cy="72" r="62" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray={389.5} strokeDashoffset={389.5 - (easyPercent * 389.5)} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                          <circle cx="72" cy="72" r="62" fill="transparent" stroke="#f59e0b" strokeWidth="8" strokeDasharray={389.5} strokeDashoffset={389.5 - (mediumPercent * 389.5)} strokeLinecap="round" className="origin-center transition-all duration-1000 ease-out" style={{ transform: `rotate(${easyPercent * 360}deg)` }} />
                          <circle cx="72" cy="72" r="62" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeDasharray={389.5} strokeDashoffset={389.5 - (hardPercent * 389.5)} strokeLinecap="round" className="origin-center transition-all duration-1000 ease-out" style={{ transform: `rotate(${(easyPercent + mediumPercent) * 360}deg)` }} />
                        </>
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-white tracking-tighter">{solvedStats.total}</span>
                      <span className="text-xs text-gray-500 font-medium mt-1">Solved</span>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-400 font-medium">Easy</span>
                        <span className="text-gray-400 font-medium"><span className="text-white">{solvedStats.easy}</span> <span className="text-gray-600">/ {solvedStats.totalEasy}</span></span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${solvedStats.totalEasy > 0 ? (solvedStats.easy / solvedStats.totalEasy) * 100 : 0}%` }}>
                          <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-amber-400 font-medium">Medium</span>
                        <span className="text-gray-400 font-medium"><span className="text-white">{solvedStats.medium}</span> <span className="text-gray-600">/ {solvedStats.totalMedium}</span></span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${solvedStats.totalMedium > 0 ? (solvedStats.medium / solvedStats.totalMedium) * 100 : 0}%` }}>
                          <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-rose-400 font-medium">Hard</span>
                        <span className="text-gray-400 font-medium"><span className="text-white">{solvedStats.hard}</span> <span className="text-gray-600">/ {solvedStats.totalHard}</span></span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-400 rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${solvedStats.totalHard > 0 ? (solvedStats.hard / solvedStats.totalHard) * 100 : 0}%` }}>
                          <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges Section */}
              <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="text-purple-400" size={20} />
                    Badges
                  </h3>
                  <span className="text-xs font-medium bg-white/5 px-2.5 py-1 rounded-full text-gray-400">
                    {badges.length} Earned
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {badges.map((badge, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105 cursor-default ${badge.color}`}>
                      <div className="p-2 bg-black/20 rounded-full shadow-inner">
                        {badge.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{badge.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{badge.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* External Coding Profiles */}
            {(platformStats || isLoadingPlatforms) && (
              <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors relative overflow-hidden">
                {isLoadingPlatforms && (
                  <div className="absolute inset-0 bg-[#1e1e1e]/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className="text-sm text-blue-400 font-medium animate-pulse">Syncing platform data...</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe className="text-emerald-400" size={20} />
                    External Coding Profiles
                  </h3>
                  <span className="text-xs font-medium bg-white/5 px-2.5 py-1 rounded-full text-gray-400">
                    {platformStats?.activePlatforms || 0} Platforms Linked
                  </span>
                </div>

                <div className="space-y-3">
                  {platformStats?.details?.map((detail: any, idx: number) => {
                    const platformColor = PLATFORMS.find(p => p.id === detail.id)?.color || 'text-gray-300';
                    return (
                      <div key={idx} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${platformColor}`}>
                            <Code2 size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-200">{detail.platform}</div>
                            <a href={detail.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:underline truncate max-w-[200px] block">
                              {detail.url}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <div className="text-sm font-medium text-white">{detail.solved}</div>
                            <div className="text-[10px] text-gray-500">Solved</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-blue-400">{detail.rating}</div>
                            <div className="text-[10px] text-gray-500">Rating/Rank</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Linked Platforms Section */}
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <LinkIcon className="text-cyan-400" size={20} />
                  Linked Platforms
                </h3>
              </div>
              
              <div className="space-y-4">
                {PLATFORMS.map(platform => {
                  const isLinked = !!linkedPlatforms[platform.id as keyof typeof linkedPlatforms];
                  return (
                    <div key={platform.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-black/20 border border-white/5 rounded-xl transition-colors hover:bg-white/5">
                      <div className="flex items-center gap-3 min-w-[150px]">
                        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${platform.color}`}>
                          <Code2 size={16} />
                        </div>
                        <span className="font-medium text-gray-200">{platform.name}</span>
                      </div>
                      
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={platformInputs[platform.id as keyof typeof platformInputs]}
                          onChange={(e) => setPlatformInputs(prev => ({ ...prev, [platform.id]: e.target.value }))}
                          placeholder={`https://${platform.id}.com/username`}
                          className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isLinked}
                        />
                        {isLinked ? (
                          <>
                            <button
                              onClick={() => handleUnlinkPlatform(platform.id)}
                              className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Unlink"
                            >
                              <X size={16} />
                            </button>
                            <div className="px-3 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-sm font-medium flex items-center gap-1">
                              <CheckCircle2 size={14} /> Verified
                            </div>
                          </>
                        ) : (
                          <button
                            onClick={() => handleLinkPlatform(platform.id)}
                            disabled={!platformInputs[platform.id as keyof typeof platformInputs]}
                            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-white/5 disabled:text-gray-500 rounded-lg text-sm font-medium transition-colors"
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="text-orange-400" size={20} />
                  Recent Submissions
                </h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="space-y-3">
                {recentSubmissions.length === 0 ? (
                  <div className="text-sm text-gray-500 italic text-center py-8 bg-white/5 rounded-xl border border-white/5 border-dashed">
                    No recent submissions yet. Start solving problems to see your activity here!
                  </div>
                ) : (
                  recentSubmissions.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/20 hover:bg-white/5 border border-white/5 rounded-xl transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-sm">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors">{p.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span className={cn(
                              "font-medium",
                              p.difficulty === 'Easy' ? "text-emerald-500" :
                              p.difficulty === 'Medium' ? "text-amber-500" : "text-rose-500"
                            )}>{p.difficulty}</span>
                            <span>•</span>
                            <span>{p.topics[0]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-emerald-500">Accepted</div>
                        <div className="text-xs text-gray-500 mt-0.5">Recently</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

