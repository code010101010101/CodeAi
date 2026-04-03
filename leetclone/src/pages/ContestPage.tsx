import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Clock, Search, Filter, Plus, Download } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Contest {
  id: string;
  name: string;
  platform: string;
  startTime: string;
  endTime: string;
  duration: number;
  url: string;
}

const PLATFORM_COLORS: Record<string, string> = {
  'LeetCode': '#FFA116',
  'Codeforces': '#318CE7',
  'CodeChef': '#5B4638',
  'AtCoder': '#222222',
  'GeeksforGeeks': '#2F8D46',
  'HackerRank': '#00EA64'
};

const generateMockContests = (): Contest[] => {
  const now = new Date();
  const contests: Contest[] = [];
  
  // Helper to get next specific day of week (0 = Sunday, 1 = Monday, etc.)
  const getNextDay = (date: Date, dayOfWeek: number, hour: number, minute: number = 0) => {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    if (resultDate.getTime() < date.getTime() || (resultDate.getDate() === date.getDate() && date.getHours() >= hour)) {
      resultDate.setDate(resultDate.getDate() + 7);
    }
    resultDate.setHours(hour, minute, 0, 0);
    return resultDate;
  };

  // 1. LeetCode Weekly (Every Sunday 2:30 AM UTC / 8:00 AM IST)
  for (let i = 0; i < 4; i++) {
    const start = getNextDay(new Date(now.getTime() + i * 7 * 24 * 60 * 60 * 1000), 0, 2, 30);
    contests.push({
      id: `lc-weekly-${i}`,
      name: `Weekly Contest ${400 + i}`,
      platform: 'LeetCode',
      startTime: start.toISOString(),
      endTime: new Date(start.getTime() + 1.5 * 60 * 60 * 1000).toISOString(),
      duration: 1.5 * 60 * 60,
      url: 'https://leetcode.com/contest/'
    });
  }

  // 2. LeetCode Biweekly (Every other Saturday 2:30 PM UTC / 8:00 PM IST)
  for (let i = 0; i < 2; i++) {
    const start = getNextDay(new Date(now.getTime() + i * 14 * 24 * 60 * 60 * 1000), 6, 14, 30);
    contests.push({
      id: `lc-biweekly-${i}`,
      name: `Biweekly Contest ${130 + i}`,
      platform: 'LeetCode',
      startTime: start.toISOString(),
      endTime: new Date(start.getTime() + 1.5 * 60 * 60 * 1000).toISOString(),
      duration: 1.5 * 60 * 60,
      url: 'https://leetcode.com/contest/'
    });
  }

  // 3. Codeforces (Randomly distributed, usually 2-3 times a week)
  const cfTypes = ['Div. 1 + Div. 2', 'Div. 2', 'Div. 3', 'Div. 4', 'Educational'];
  for (let i = 0; i < 5; i++) {
    const start = new Date(now.getTime() + (Math.random() * 14 + 1) * 24 * 60 * 60 * 1000);
    start.setHours(14, 35, 0, 0);
    const type = cfTypes[Math.floor(Math.random() * cfTypes.length)];
    contests.push({
      id: `cf-${i}`,
      name: type === 'Educational' ? `Educational Codeforces Round ${165 + i}` : `Codeforces Round ${950 + i} (${type})`,
      platform: 'Codeforces',
      startTime: start.toISOString(),
      endTime: new Date(start.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      duration: 2 * 60 * 60,
      url: 'https://codeforces.com/contests'
    });
  }

  // 4. CodeChef Starters (Every Wednesday 2:30 PM UTC / 8:00 PM IST)
  for (let i = 0; i < 4; i++) {
    const start = getNextDay(new Date(now.getTime() + i * 7 * 24 * 60 * 60 * 1000), 3, 14, 30);
    contests.push({
      id: `cc-${i}`,
      name: `Starters ${130 + i} (Div. 1, 2, 3 & 4)`,
      platform: 'CodeChef',
      startTime: start.toISOString(),
      endTime: new Date(start.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      duration: 2 * 60 * 60,
      url: 'https://www.codechef.com/contests'
    });
  }

  // 5. AtCoder Beginner Contest (Every Saturday 12:00 PM UTC / 5:30 PM IST)
  for (let i = 0; i < 4; i++) {
    const start = getNextDay(new Date(now.getTime() + i * 7 * 24 * 60 * 60 * 1000), 6, 12, 0);
    contests.push({
      id: `ac-${i}`,
      name: `AtCoder Beginner Contest ${350 + i}`,
      platform: 'AtCoder',
      startTime: start.toISOString(),
      endTime: new Date(start.getTime() + 1.66 * 60 * 60 * 1000).toISOString(),
      duration: 1.66 * 60 * 60,
      url: 'https://atcoder.jp/contests/'
    });
  }

  // 6. GeeksforGeeks (Job-A-Thon on 21st of the month)
  const gfgStart = new Date(now.getFullYear(), now.getMonth() + (now.getDate() > 21 ? 1 : 0), 21, 14, 0, 0);
  contests.push({
    id: `gfg-1`,
    name: `Job-A-Thon ${gfgStart.toLocaleString('default', { month: 'long' })} ${gfgStart.getFullYear()}`,
    platform: 'GeeksforGeeks',
    startTime: gfgStart.toISOString(),
    endTime: new Date(gfgStart.getTime() + 2.5 * 60 * 60 * 1000).toISOString(),
    duration: 2.5 * 60 * 60,
    url: 'https://practice.geeksforgeeks.org/events'
  });

  // 7. Ongoing Contest (Started 1 hour ago)
  const ongoingStart = new Date(now.getTime() - 1 * 60 * 60 * 1000);
  contests.push({
    id: 'ongoing-1',
    name: 'Codeforces Global Round 25',
    platform: 'Codeforces',
    startTime: ongoingStart.toISOString(),
    endTime: new Date(ongoingStart.getTime() + 2.5 * 60 * 60 * 1000).toISOString(),
    duration: 2.5 * 60 * 60,
    url: 'https://codeforces.com/contests'
  });

  return contests.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
};

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m > 0 ? `${m}m` : ''}`;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

const getGoogleCalendarUrl = (contest: Contest) => {
  const start = new Date(contest.startTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(contest.endTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.append("action", "TEMPLATE");
  url.searchParams.append("text", contest.name);
  url.searchParams.append("dates", `${start}/${end}`);
  url.searchParams.append("details", `Join contest at: ${contest.url}`);
  url.searchParams.append("location", contest.platform);
  return url.toString();
};

const generateICS = (contests: Contest[]) => {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//CodePlatform//EN\n";
  
  contests.forEach(contest => {
    const start = new Date(contest.startTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const end = new Date(contest.endTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const now = new Date().toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    icsContent += "BEGIN:VEVENT\n";
    icsContent += `UID:${contest.id}@codeplatform.com\n`;
    icsContent += `DTSTAMP:${now}\n`;
    icsContent += `DTSTART:${start}\n`;
    icsContent += `DTEND:${end}\n`;
    icsContent += `SUMMARY:${contest.name}\n`;
    icsContent += `DESCRIPTION:Platform: ${contest.platform}\\nURL: ${contest.url}\n`;
    icsContent += `URL:${contest.url}\n`;
    icsContent += "END:VEVENT\n";
  });
  
  icsContent += "END:VCALENDAR";
  
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'coding_contests.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft(null);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <span className="text-green-400 font-medium">Started</span>;

  return (
    <div className="flex items-center gap-1.5 text-orange-400 font-mono text-sm bg-orange-500/10 px-2 py-1 rounded">
      <Clock size={14} />
      <span>{timeLeft.d}d {timeLeft.h.toString().padStart(2, '0')}h {timeLeft.m.toString().padStart(2, '0')}m {timeLeft.s.toString().padStart(2, '0')}s</span>
    </div>
  );
};

export default function ContestPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing'>('upcoming');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real app, this would fetch from an API like Kontests or CList
    setContests(generateMockContests());
  }, []);

  const now = new Date().getTime();
  
  const filteredContests = contests.filter(c => {
    const start = new Date(c.startTime).getTime();
    const end = new Date(c.endTime).getTime();
    
    const isOngoing = start <= now && end >= now;
    const isUpcoming = start > now;

    const matchesTab = activeTab === 'ongoing' ? isOngoing : isUpcoming;
    const matchesPlatform = selectedPlatform === 'All' || c.platform === selectedPlatform;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.platform.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesPlatform && matchesSearch;
  });

  const platforms = ['All', ...Array.from(new Set(contests.map(c => c.platform)))];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Event Tracker</h1>
            <p className="text-gray-400">Track and schedule upcoming coding contests across all platforms.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#282828] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === 'upcoming' ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
              )}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('ongoing')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === 'ongoing' ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
              )}
            >
              Ongoing
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#282828] p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
            {platforms.map(platform => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                  selectedPlatform === platform 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5"
                )}
              >
                {platform}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => generateICS(filteredContests)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              title="Download schedule for your calendar app"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export to Calendar</span>
            </button>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search contests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Contest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContests.length > 0 ? (
            filteredContests.map(contest => (
              <div 
                key={contest.id}
                className="bg-[#282828] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-inner"
                      style={{ backgroundColor: `${PLATFORM_COLORS[contest.platform] || '#444'}20`, color: PLATFORM_COLORS[contest.platform] || '#fff' }}
                    >
                      {contest.platform.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white line-clamp-1 group-hover:text-orange-400 transition-colors" title={contest.name}>
                        {contest.name}
                      </h3>
                      <p className="text-xs text-gray-400">{contest.platform}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Start</span>
                    <span className="text-gray-200 font-medium">{formatDate(contest.startTime)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-gray-200 font-medium">{formatDuration(contest.duration)}</span>
                  </div>
                  {activeTab === 'upcoming' && (
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                      <span className="text-gray-400">Starts In</span>
                      <Countdown targetDate={contest.startTime} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                  <a 
                    href={getGoogleCalendarUrl(contest)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Calendar size={16} />
                    Add to Calendar
                  </a>
                  <a 
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} />
                    Register
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-[#282828] rounded-xl border border-white/10">
              <Calendar className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-1">No contests found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
