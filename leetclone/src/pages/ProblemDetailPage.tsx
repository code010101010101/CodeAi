import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { Panel, Group, Separator } from 'react-resizable-panels';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Play, 
  Send, 
  Clock, 
  MessageSquare, 
  ThumbsUp, 
  Star,
  Maximize2,
  Terminal,
  CheckCircle2,
  Circle,
  ChevronDown,
  X,
  Trash2
} from 'lucide-react';
import { problems } from '@/src/constants';
import { cn } from '@/src/lib/utils';

const languages = [
  { id: 'javascript', name: 'JavaScript', extension: 'js', defaultCode: (id: string) => `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar ${id.replace(/-/g, '_')} = function(nums, target) {\n    \n};` },
  { id: 'typescript', name: 'TypeScript', extension: 'ts', defaultCode: (id: string) => `function ${id.replace(/-/g, '_')}(nums: number[], target: number): number[] {\n    \n};` },
  { id: 'python', name: 'Python', extension: 'py', defaultCode: (id: string) => `class Solution:\n    def ${id.replace(/-/g, '_')}(self, nums: List[int], target: int) -> List[int]:\n        pass` },
  { id: 'java', name: 'Java', extension: 'java', defaultCode: (id: string) => `class Solution {\n    public int[] ${id.replace(/-/g, '_')}(int[] nums, int target) {\n        \n    }\n}` },
  { id: 'cpp', name: 'C++', extension: 'cpp', defaultCode: (id: string) => `class Solution {\npublic:\n    vector<int> ${id.replace(/-/g, '_')}(vector<int>& nums, int target) {\n        \n    }\n};` },
];

// Cache for code execution results to provide instant feedback
const judgeCache = new Map<string, any>();

export default function ProblemDetailPage() {
  const { id } = useParams();
  const problem = problems.find(p => p.id === id) || problems[0];
  const [activeTab, setActiveTab] = useState<'description' | 'solutions' | 'submissions'>('description');
  const [selectedLang, setSelectedLang] = useState(() => {
    const savedLangId = localStorage.getItem('preferred-language');
    if (savedLangId) {
      const lang = languages.find(l => l.id === savedLangId);
      if (lang) return lang;
    }
    return languages[0];
  });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [code, setCode] = useState(() => {
    const savedCode = localStorage.getItem(`code-${problem.id}-${selectedLang.id}`);
    return savedCode || selectedLang.defaultCode(problem.id);
  });

  // Handle problem navigation and language change
  useEffect(() => {
    const fetchStarterCode = async () => {
      const cacheKey = `starter-code-${problem.id}-${selectedLang.id}`;
      const cachedStarter = localStorage.getItem(cacheKey);
      const savedCode = localStorage.getItem(`code-${problem.id}-${selectedLang.id}`);
      const oldGenericDefault = selectedLang.defaultCode(problem.id);

      // If user has modified the code, use their modified code
      if (savedCode && savedCode !== oldGenericDefault && savedCode !== cachedStarter) {
        setCode(savedCode);
        return;
      }

      // If we have a cached starter code, use it
      if (cachedStarter) {
        setCode(cachedStarter);
        return;
      }

      // Set to generic default while fetching
      setCode(oldGenericDefault);

      try {
        // Try LeetCode API first
        const lcSlug = problem.id === 'missing-in-array' ? 'missing-number' : 
                       problem.id === 'move-all-zeroes-to-end' ? 'move-zeroes' :
                       problem.id === 'reverse-a-doubly-linked-list' ? 'reverse-linked-list' :
                       problem.id;
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/select/raw?titleSlug=${lcSlug}`);
        const data = await res.json();
        if (data?.question?.codeSnippets) {
          const snippet = data.question.codeSnippets.find((s: any) => 
            s.langSlug === selectedLang.id || 
            s.lang.toLowerCase() === selectedLang.name.toLowerCase() ||
            (selectedLang.id === 'cpp' && s.langSlug === 'cpp') ||
            (selectedLang.id === 'javascript' && s.langSlug === 'javascript')
          );
          if (snippet) {
            localStorage.setItem(cacheKey, snippet.code);
            setCode(snippet.code);
            return;
          }
        }
      } catch (e) {
        console.error('LeetCode API failed', e);
      }

      // Fallback to GoogleGenAI
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-preview",
          contents: `Provide ONLY the raw starter code function signature for the programming problem "${problem.title}" in ${selectedLang.name}. Do not include any explanations, markdown formatting, or backticks. Just the raw code as it would appear in the code editor on GeeksForGeeks or LeetCode.`,
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL }
          }
        });
        let generatedCode = response.text?.trim() || '';
        generatedCode = generatedCode.replace(/^```[\w]*\n/, '').replace(/\n```$/, '');
        if (generatedCode) {
          localStorage.setItem(cacheKey, generatedCode);
          setCode(generatedCode);
          return;
        }
      } catch (e) {
        console.error('AI fallback failed', e);
      }
    };

    fetchStarterCode();
  }, [problem.id, selectedLang.id, problem.title]);

  // Save code changes
  useEffect(() => {
    localStorage.setItem(`code-${problem.id}-${selectedLang.id}`, code);
    
    // Mark as attempting if code is changed and not already solved
    const currentStatus = localStorage.getItem(`problem-status-${problem.id}`);
    const cacheKey = `starter-code-${problem.id}-${selectedLang.id}`;
    const cachedStarter = localStorage.getItem(cacheKey);
    
    if (currentStatus !== 'solved' && code !== selectedLang.defaultCode(problem.id) && code !== cachedStarter) {
      localStorage.setItem(`problem-status-${problem.id}`, 'attempting');
    }
  }, [code, problem.id, selectedLang.id]);

  // Track time spent coding and update streak
  useEffect(() => {
    // Update streak
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem('lastActiveDate');
    
    if (lastActive !== today) {
      localStorage.setItem('lastActiveDate', today);
      if (lastActive) {
        const lastDate = new Date(lastActive);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        let currentStreak = parseInt(localStorage.getItem('currentStreak') || '0', 10);
        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
        localStorage.setItem('currentStreak', currentStreak.toString());
        
        const maxStreak = parseInt(localStorage.getItem('maxStreak') || '0', 10);
        if (currentStreak > maxStreak) {
          localStorage.setItem('maxStreak', currentStreak.toString());
        }
      } else {
        localStorage.setItem('currentStreak', '1');
        localStorage.setItem('maxStreak', '1');
      }
    }

    // Track time
    const interval = setInterval(() => {
      const currentSeconds = parseInt(localStorage.getItem('secondsCoded') || '0', 10);
      localStorage.setItem('secondsCoded', (currentSeconds + 5).toString());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingSolution, setIsGeneratingSolution] = useState(false);
  const [aiSolution, setAiSolution] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([
    { id: 1, status: 'Accepted', runtime: 45, memory: 42.1, date: '2026-03-25 14:20', lang: 'JavaScript' },
    { id: 2, status: 'Wrong Answer', runtime: 0, memory: 0, date: '2026-03-25 14:15', lang: 'JavaScript' },
  ]);
  const [result, setResult] = useState<{ 
    type?: 'run' | 'submit',
    status: 'success' | 'error' | 'wrong' | 'none', 
    message: string,
    runtime?: number,
    runtimePercentile?: number,
    memory?: number,
    memoryPercentile?: number,
    testCaseResults?: boolean[],
    testCaseOutputs?: string[]
  }>({ status: 'none', message: '' });
  const [showConsole, setShowConsole] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [customTestCases, setCustomTestCases] = useState<any[]>([]);

  const [isLiked, setIsLiked] = useState(() => localStorage.getItem(`problem-liked-${problem.id}`) === 'true');
  const [likesCount, setLikesCount] = useState(() => parseInt(localStorage.getItem(`problem-likes-${problem.id}`) || '12400', 10));
  
  const [comments, setComments] = useState<any[]>(() => {
    const saved = localStorage.getItem(`problem-comments-${problem.id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    const newLiked = !isLiked;
    const newCount = newLiked ? likesCount + 1 : likesCount - 1;
    setIsLiked(newLiked);
    setLikesCount(newCount);
    localStorage.setItem(`problem-liked-${problem.id}`, newLiked.toString());
    localStorage.setItem(`problem-likes-${problem.id}`, newCount.toString());
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      text: newComment,
      date: new Date().toLocaleString(),
      author: localStorage.getItem('profileName') || 'John Doe'
    };
    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    setNewComment('');
    localStorage.setItem(`problem-comments-${problem.id}`, JSON.stringify(updatedComments));
  };

  const handleDeleteComment = (id: number) => {
    const updatedComments = comments.filter(c => c.id !== id);
    setComments(updatedComments);
    localStorage.setItem(`problem-comments-${problem.id}`, JSON.stringify(updatedComments));
  };

  const sampleTestCases = [...(problem.testCases?.filter(tc => tc.isSample) || []), ...customTestCases];

  const judgeCode = async (code: string, language: string, type: 'run' | 'submit') => {
    const cacheKey = `${problem.id}-${language}-${type}-${code}-${JSON.stringify(customTestCases)}`;
    if (judgeCache.has(cacheKey)) {
      // Simulate a tiny delay for UX so it doesn't feel broken
      await new Promise(resolve => setTimeout(resolve, 300));
      return judgeCache.get(cacheKey);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      // Use a faster, lighter model for 'run' to provide instant feedback
      const model = type === 'run' ? "gemini-3.1-flash-lite-preview" : "gemini-3-flash-preview";
      const thinkingLevel = type === 'run' ? ThinkingLevel.MINIMAL : ThinkingLevel.HIGH;

      const systemInstruction = `You are a fast competitive programming judge.
      Problem: "${problem.title}".
      
      Rules:
      - status: "success" (correct), "error" (syntax/runtime), "wrong" (logical error).
      ${type === 'run' 
        ? `- Evaluate the code ONLY against these specific sample test cases: ${JSON.stringify(sampleTestCases)}. Do NOT check hidden test cases.` 
        : `- Evaluate the code against ALL test cases, including hidden test cases. Simulate a full test suite.`}
      - If a test case has an empty or missing expected output, evaluate the code to produce the actual output, and consider that specific test case passed (true).
      - Provide realistic runtime (ms), memory (MB), and percentiles.
      - Include testCaseResults: an array of booleans indicating if each test case passed (true) or failed (false).
      - Include testCaseOutputs: an array of strings containing the actual output produced by the user's code for each test case.
      - Return ONLY JSON.`;

      const prompt = `Lang: ${language}, Type: ${type}, Code: ${code}`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingLevel },
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, enum: ['success', 'error', 'wrong'] },
              message: { type: Type.STRING },
              runtime: { type: Type.NUMBER },
              runtimePercentile: { type: Type.NUMBER },
              memory: { type: Type.NUMBER },
              memoryPercentile: { type: Type.NUMBER },
              testCaseResults: {
                type: Type.ARRAY,
                items: { type: Type.BOOLEAN }
              },
              testCaseOutputs: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['status', 'message']
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");

      // Clean the response text in case the model included markdown blocks
      const cleanedText = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
      
      try {
        const parsedResult = JSON.parse(cleanedText);
        judgeCache.set(cacheKey, parsedResult);
        return parsedResult;
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw text:", text);
        // Fallback: Try to extract JSON if it's buried in text
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const fallbackResult = JSON.parse(jsonMatch[0]);
          judgeCache.set(cacheKey, fallbackResult);
          return fallbackResult;
        }
        throw parseError;
      }
    } catch (error) {
      console.error("Judging error:", error);
      return { 
        status: 'error', 
        message: `Judging Error: ${error instanceof Error ? error.message : 'Failed to parse judge response'}` 
      };
    }
  };

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelectedLang(lang);
    localStorage.setItem('preferred-language', lang.id);
    setIsLangDropdownOpen(false);
  };

  const simulateExecution = async (type: 'run' | 'submit') => {
    if (type === 'run') {
      setIsRunning(true);
    } else {
      setShowConsole(false);
      setIsSubmitting(true);
      setActiveTab('submissions');
    }
    
    setResult({ type, status: 'none', message: type === 'run' ? 'Running code...' : 'Submitting solution...' });

    const evaluation = await judgeCode(code, selectedLang.name, type);
    
    setResult({
      type,
      status: evaluation.status,
      message: evaluation.message,
      runtime: evaluation.runtime,
      runtimePercentile: evaluation.runtimePercentile,
      memory: evaluation.memory,
      memoryPercentile: evaluation.memoryPercentile,
      testCaseResults: evaluation.testCaseResults,
      testCaseOutputs: evaluation.testCaseOutputs
    });

    if (type === 'submit' && evaluation.status === 'success') {
      const currentStatus = localStorage.getItem(`problem-status-${problem.id}`);
      if (currentStatus !== 'solved') {
        localStorage.setItem(`problem-status-${problem.id}`, 'solved');
        const currentSolutions = parseInt(localStorage.getItem('solutionsCount') || '0', 10);
        localStorage.setItem('solutionsCount', (currentSolutions + 1).toString());
      }
      setSubmissions([
        { 
          id: Date.now(), 
          status: 'Accepted', 
          runtime: evaluation.runtime || 45, 
          memory: evaluation.memory || 42.1, 
          date: new Date().toLocaleString(), 
          lang: selectedLang.name 
        },
        ...submissions
      ]);
    } else if (type === 'submit' && evaluation.status !== 'success') {
      const currentStatus = localStorage.getItem(`problem-status-${problem.id}`);
      if (currentStatus !== 'solved') {
        localStorage.setItem(`problem-status-${problem.id}`, 'attempting');
      }
      setSubmissions([
        { 
          id: Date.now(), 
          status: evaluation.status === 'wrong' ? 'Wrong Answer' : 'Runtime Error', 
          runtime: 0, 
          memory: 0, 
          date: new Date().toLocaleString(), 
          lang: selectedLang.name 
        },
        ...submissions
      ]);
    }

    setIsRunning(false);
    setIsSubmitting(false);
  };

  const generateSolution = async () => {
    setIsGeneratingSolution(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      const response = await ai.models.generateContent({
        model,
        contents: `Provide a clean, efficient solution for the LeetCode problem: "${problem.title}" in ${selectedLang.name}. Include a brief explanation.`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });
      setAiSolution(response.text);
    } catch (error) {
      console.error("Solution generation error:", error);
      setAiSolution("Failed to generate solution. Please try again.");
    }
    setIsGeneratingSolution(false);
  };

  return (
    <div className="h-[calc(100vh-48px)] bg-[#1a1a1a] text-gray-300 flex flex-col overflow-hidden">
      {/* Sub Navbar */}
      <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-[#282828]">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/problems" className="hover:bg-white/5 p-1 rounded transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <span className="text-gray-500">Problem List</span>
          <div className="flex items-center gap-1 ml-4">
            <button className="hover:bg-white/5 p-1 rounded transition-colors"><ChevronLeft size={16} /></button>
            <button className="hover:bg-white/5 p-1 rounded transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-xs hover:text-white transition-colors">
            <Settings size={14} /> Settings
          </button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        <Group orientation="horizontal">
          {/* Left Panel: Description */}
          <Panel defaultSize={50} minSize={20} className="flex flex-col bg-[#282828]">
            <div className="flex items-center border-b border-white/10 px-2 h-9">
              <button 
                onClick={() => setActiveTab('description')}
                className={cn(
                  "px-4 h-full text-xs font-medium border-b-2 transition-colors",
                  activeTab === 'description' ? "text-white border-white" : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('solutions')}
                className={cn(
                  "px-4 h-full text-xs font-medium border-b-2 transition-colors",
                  activeTab === 'solutions' ? "text-white border-white" : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                Solutions
              </button>
              <button 
                onClick={() => setActiveTab('submissions')}
                className={cn(
                  "px-4 h-full text-xs font-medium border-b-2 transition-colors",
                  activeTab === 'submissions' ? "text-white border-white" : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                Submissions
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {activeTab === 'description' && (
                <div className="relative h-full">
                  {showComments ? (
                    <div className="absolute inset-0 bg-[#1a1a1a] z-10 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Comments ({comments.length})</h2>
                        <button onClick={() => setShowComments(false)} className="text-gray-400 hover:text-white transition-colors">
                          <X size={20} />
                        </button>
                      </div>
                      
                      <div className="flex gap-2 mb-6">
                        <input 
                          type="text" 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                          placeholder="Add a comment..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
                        />
                        <button 
                          onClick={handleAddComment}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Post
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2 pb-8">
                        {comments.length === 0 ? (
                          <div className="text-center text-gray-500 py-8 text-sm">No comments yet. Be the first to comment!</div>
                        ) : (
                          comments.map(comment => (
                            <div key={comment.id} className="bg-white/5 p-4 rounded-lg border border-white/5 group">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-[10px] font-bold text-white">
                                    {comment.author.substring(0, 2).toUpperCase()}
                                  </div>
                                  <span className="text-sm font-medium text-gray-300">{comment.author}</span>
                                  <span className="text-[10px] text-gray-500">{comment.date}</span>
                                </div>
                                <button 
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <p className="text-sm text-gray-400 whitespace-pre-wrap">{comment.text}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <h1 className="text-2xl font-bold text-white mb-4">{problem.order}. {problem.title}</h1>
                      <div className="flex items-center gap-3 mb-6">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full font-medium",
                          problem.difficulty === 'Easy' && "bg-green-500/10 text-green-500",
                          problem.difficulty === 'Medium' && "bg-yellow-500/10 text-yellow-500",
                          problem.difficulty === 'Hard' && "bg-red-500/10 text-red-500"
                        )}>
                          {problem.difficulty}
                        </span>
                        <button 
                          onClick={handleLike}
                          className={cn(
                            "flex items-center gap-1 text-xs transition-colors",
                            isLiked ? "text-blue-400" : "text-gray-500 hover:text-gray-400"
                          )}
                        >
                          <ThumbsUp size={14} className={cn(isLiked && "fill-current")} /> 
                          {likesCount >= 1000 ? (likesCount / 1000).toFixed(1) + 'K' : likesCount}
                        </button>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star size={14} /> Add to List
                        </div>
                        <button 
                          onClick={() => setShowComments(true)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-400 transition-colors"
                        >
                          <MessageSquare size={14} /> {comments.length}
                        </button>
                      </div>

                      <div 
                        className="prose prose-invert max-w-none text-sm leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: problem.description || '<p>Description not available.</p>' }}
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'solutions' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">AI Solutions</h2>
                    <button 
                      onClick={generateSolution}
                      disabled={isGeneratingSolution}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-50"
                    >
                      {isGeneratingSolution ? "Generating..." : "Get AI Solution"}
                    </button>
                  </div>
                  
                  {aiSolution ? (
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 prose prose-invert max-w-none text-sm">
                      <div className="whitespace-pre-wrap font-mono text-xs">
                        {aiSolution}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
                      <MessageSquare size={48} className="opacity-20" />
                      <p className="text-sm">Click the button above to generate an AI solution for this problem.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="space-y-8">
                  {isSubmitting && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-white mb-4">Latest Submission Result</h2>
                      <div className="bg-white/5 border border-white/10 p-12 rounded-xl flex flex-col items-center justify-center gap-4">
                        <div className="w-8 h-8 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                        <div className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-[10px]">Submitting solution...</div>
                      </div>
                    </div>
                  )}
                  {!isSubmitting && result.type === 'submit' && result.status !== 'none' && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-white mb-4">Latest Submission Result</h2>
                      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                        {result.status === 'success' && (
                          <div className="space-y-6">
                            <div className="flex items-center gap-2 text-xl font-bold text-green-500">
                              <CheckCircle2 size={24} /> {result.message.split('\n')[0]}
                            </div>
                            
                            {result.runtimePercentile ? (
                              <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-end">
                                    <div>
                                      <div className="text-gray-400 text-[10px] uppercase mb-1">Runtime</div>
                                      <div className="text-lg font-bold text-white">{result.runtime} ms</div>
                                    </div>
                                    <div className="text-green-500 text-xs">Beats {result.runtimePercentile}%</div>
                                  </div>
                                  <div className="h-24 flex items-end gap-1">
                                    {[20, 35, 50, 80, 60, 40, 25, 15, 10, 5].map((h, i) => (
                                      <div 
                                        key={i} 
                                        className={cn(
                                          "flex-1 rounded-t transition-all duration-500",
                                          i === 3 ? "bg-green-500" : "bg-white/10"
                                        )} 
                                        style={{ height: `${h}%` }} 
                                      />
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="flex justify-between items-end">
                                    <div>
                                      <div className="text-gray-400 text-[10px] uppercase mb-1">Memory</div>
                                      <div className="text-lg font-bold text-white">{result.memory} MB</div>
                                    </div>
                                    <div className="text-green-500 text-xs">Beats {result.memoryPercentile}%</div>
                                  </div>
                                  <div className="h-24 flex items-end gap-1">
                                    {[10, 20, 45, 70, 90, 60, 30, 20, 10, 5].map((h, i) => (
                                      <div 
                                        key={i} 
                                        className={cn(
                                          "flex-1 rounded-t transition-all duration-500",
                                          i === 4 ? "bg-green-500" : "bg-white/10"
                                        )} 
                                        style={{ height: `${h}%` }} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-white/5 border border-white/10 p-4 rounded-lg whitespace-pre-wrap text-gray-300">
                                {result.message.split('\n').slice(1).join('\n')}
                                <div className="mt-4 pt-4 border-t border-white/5 text-gray-500">
                                  Runtime: {result.runtime} ms
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {result.status === 'wrong' && (
                          <div className="space-y-4">
                            <div className="text-xl font-bold text-red-500 flex items-center gap-2">
                              <Circle size={24} className="fill-red-500/20" /> Wrong Answer
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 whitespace-pre-wrap">
                              {result.message}
                            </div>
                          </div>
                        )}
                        {result.status === 'error' && (
                          <div className="space-y-4">
                            <div className="text-xl font-bold text-red-500">Runtime Error</div>
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 whitespace-pre-wrap">
                              {result.message}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Submission History</h2>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[10px] uppercase text-gray-500 font-semibold">
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Runtime</th>
                            <th className="px-4 py-3">Memory</th>
                            <th className="px-4 py-3">Language</th>
                            <th className="px-4 py-3">Date</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          {submissions.map((sub) => (
                            <tr key={sub.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                              <td className="px-4 py-4">
                                <span className={cn(
                                  "font-bold",
                                  sub.status === 'Accepted' ? "text-green-500" : "text-red-500"
                                )}>
                                  {sub.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-gray-400">{sub.runtime} ms</td>
                              <td className="px-4 py-4 text-gray-400">{sub.memory} MB</td>
                              <td className="px-4 py-4 text-gray-400">{sub.lang}</td>
                              <td className="px-4 py-4 text-gray-500">{sub.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Panel>

          <Separator className="w-1.5 bg-[#1a1a1a] hover:bg-orange-500/30 transition-colors cursor-col-resize flex items-center justify-center group">
            <div className="w-[1px] h-8 bg-white/10 group-hover:bg-orange-500/50" />
          </Separator>

          {/* Right Panel: Editor & Testcases */}
          <Panel defaultSize={50} minSize={20}>
            <Group orientation="vertical">
              {/* Editor Panel */}
              <Panel defaultSize={60} minSize={20} className="flex flex-col bg-[#1e1e1e]">
                <div className="h-9 border-b border-white/10 flex items-center justify-between px-2 bg-[#282828]">
                  <div className="flex items-center gap-2 relative">
                    <button 
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      className="bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
                    >
                      {selectedLang.name} <ChevronDown size={12} />
                    </button>
                    
                    {isLangDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-[#282828] border border-white/10 rounded-lg shadow-xl z-50 py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.id}
                            onClick={() => handleLanguageChange(lang)}
                            className={cn(
                              "w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors",
                              selectedLang.id === lang.id ? "text-orange-500 font-bold" : "text-gray-300"
                            )}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-white/5 rounded transition-colors"><Maximize2 size={14} /></button>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <Editor
                    height="100%"
                    language={selectedLang.id}
                    theme="vs-dark"
                    value={code}
                    onChange={(v) => setCode(v || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      readOnly: false,
                      automaticLayout: true,
                      padding: { top: 10 }
                    }}
                  />

                  {/* Console Overlay */}
                  {showConsole && (
                    <div className="absolute bottom-0 left-0 right-0 h-full bg-[#282828] border-t border-white/10 z-40 flex flex-col shadow-2xl">
                      <div className="h-8 border-b border-white/10 flex items-center justify-between px-4 bg-[#333]">
                        <span className="text-[10px] font-bold uppercase text-gray-400">Result</span>
                        <button onClick={() => setShowConsole(false)} className="text-gray-500 hover:text-white transition-colors">
                          <ChevronDown size={14} />
                        </button>
                      </div>
                      <div className="flex-1 p-6 font-mono text-xs overflow-y-auto custom-scrollbar">
                        {result.type === 'run' ? (
                          <>
                            {result.status === 'success' && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-2 text-xl font-bold text-green-500">
                                  <CheckCircle2 size={24} /> {result.message.split('\n')[0]}
                                </div>
                                
                                {result.runtimePercentile ? (
                                  <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                      <div className="flex justify-between items-end">
                                        <div>
                                          <div className="text-gray-400 text-[10px] uppercase mb-1">Runtime</div>
                                          <div className="text-lg font-bold text-white">{result.runtime} ms</div>
                                        </div>
                                        <div className="text-green-500 text-xs">Beats {result.runtimePercentile}%</div>
                                      </div>
                                      <div className="h-24 flex items-end gap-1">
                                        {[20, 35, 50, 80, 60, 40, 25, 15, 10, 5].map((h, i) => (
                                          <div 
                                            key={i} 
                                            className={cn(
                                              "flex-1 rounded-t transition-all duration-500",
                                              i === 3 ? "bg-green-500" : "bg-white/10"
                                            )} 
                                            style={{ height: `${h}%` }} 
                                          />
                                        ))}
                                      </div>
                                    </div>

                                    <div className="space-y-4">
                                      <div className="flex justify-between items-end">
                                        <div>
                                          <div className="text-gray-400 text-[10px] uppercase mb-1">Memory</div>
                                          <div className="text-lg font-bold text-white">{result.memory} MB</div>
                                        </div>
                                        <div className="text-green-500 text-xs">Beats {result.memoryPercentile}%</div>
                                      </div>
                                      <div className="h-24 flex items-end gap-1">
                                        {[10, 20, 45, 70, 90, 60, 30, 20, 10, 5].map((h, i) => (
                                          <div 
                                            key={i} 
                                            className={cn(
                                              "flex-1 rounded-t transition-all duration-500",
                                              i === 4 ? "bg-green-500" : "bg-white/10"
                                            )} 
                                            style={{ height: `${h}%` }} 
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg whitespace-pre-wrap text-gray-300">
                                    {result.message.split('\n').slice(1).join('\n')}
                                    <div className="mt-4 pt-4 border-t border-white/5 text-gray-500">
                                      Runtime: {result.runtime} ms
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {result.status === 'wrong' && (
                              <div className="space-y-4">
                                <div className="text-xl font-bold text-red-500 flex items-center gap-2">
                                  <Circle size={24} className="fill-red-500/20" /> Wrong Answer
                                </div>
                                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 whitespace-pre-wrap">
                                  {result.message}
                                </div>
                              </div>
                            )}
                            {result.status === 'error' && (
                              <div className="space-y-4">
                                <div className="text-xl font-bold text-red-500">Runtime Error</div>
                                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 whitespace-pre-wrap">
                                  {result.message}
                                </div>
                              </div>
                            )}
                            {result.status === 'none' && (
                              <div className="flex flex-col items-center justify-center h-full gap-4">
                                <div className="w-8 h-8 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                                <div className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-[10px]">{result.message}</div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
                            <Terminal size={32} className="opacity-20" />
                            <p>Run your code to see the output here.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Panel>

              <Separator className="h-1.5 bg-[#1a1a1a] hover:bg-orange-500/30 transition-colors cursor-row-resize flex items-center justify-center group">
                <div className="h-[1px] w-8 bg-white/10 group-hover:bg-orange-500/50" />
              </Separator>

              {/* Testcases Panel */}
              <Panel defaultSize={40} minSize={20} className="bg-[#282828] flex flex-col overflow-hidden">
                <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#282828]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowConsole(!showConsole)}
                      className="flex items-center gap-2 text-xs font-medium hover:bg-white/5 px-3 py-1.5 rounded transition-colors"
                    >
                      <Terminal size={14} /> Console
                    </button>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Testcases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => simulateExecution('run')}
                      disabled={isRunning || isSubmitting}
                      className={cn(
                        "bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2",
                        (isRunning || isSubmitting) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isRunning ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Play size={12} fill="currentColor" />}
                      Run
                    </button>
                    <button 
                      onClick={() => simulateExecution('submit')}
                      disabled={isRunning || isSubmitting}
                      className={cn(
                        "bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-2",
                        (isRunning || isSubmitting) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Send size={12} fill="currentColor" />}
                      Submit
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <div className="flex gap-2 mb-4 overflow-x-auto custom-scrollbar pb-2">
                    {sampleTestCases.map((tc, idx) => {
                      let bgClass = selectedTestCase === idx 
                        ? "bg-white/10 text-white" 
                        : "bg-white/5 text-gray-500 hover:bg-white/10";
                      
                      if (result.status !== 'none' && result.testCaseResults && result.testCaseResults.length > idx) {
                        const passed = result.testCaseResults[idx];
                        if (passed) {
                          bgClass = selectedTestCase === idx 
                            ? "bg-green-500/30 text-green-400" 
                            : "bg-green-500/10 text-green-500 hover:bg-green-500/20";
                        } else {
                          bgClass = selectedTestCase === idx 
                            ? "bg-red-500/30 text-red-400" 
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20";
                        }
                      }

                      return (
                        <div key={tc.id} className="relative group flex items-center">
                          <button
                            onClick={() => setSelectedTestCase(idx)}
                            className={cn(
                              "px-4 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                              bgClass,
                              tc.isCustom && "pr-8" // Extra padding for the close button
                            )}
                          >
                            Case {idx + 1} {tc.isCustom && "(Custom)"}
                          </button>
                          {tc.isCustom && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const newCustom = customTestCases.filter(c => c.id !== tc.id);
                                setCustomTestCases(newCustom);
                                if (selectedTestCase >= idx) {
                                  setSelectedTestCase(Math.max(0, selectedTestCase - 1));
                                }
                              }}
                              className="absolute right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <button
                      onClick={() => {
                        const newTc = {
                          id: Date.now(),
                          input: "",
                          output: "",
                          isSample: true,
                          isCustom: true
                        };
                        setCustomTestCases([...customTestCases, newTc]);
                        setSelectedTestCase(sampleTestCases.length);
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors bg-white/5 text-gray-500 hover:bg-white/10 whitespace-nowrap"
                    >
                      + Custom Input
                    </button>
                  </div>

                  {sampleTestCases[selectedTestCase] && (
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Input:</div>
                        {sampleTestCases[selectedTestCase].isCustom ? (
                          <textarea 
                            className="w-full bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-xs text-gray-300 focus:outline-none focus:border-orange-500/50 resize-none"
                            rows={3}
                            value={sampleTestCases[selectedTestCase].input}
                            onChange={(e) => {
                              const newCustom = [...customTestCases];
                              const customIdx = selectedTestCase - (problem.testCases?.filter(tc => tc.isSample).length || 0);
                              newCustom[customIdx].input = e.target.value;
                              setCustomTestCases(newCustom);
                            }}
                            placeholder="Enter custom input (e.g., nums = [1,2], target = 3)"
                          />
                        ) : (
                          <div className="bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-xs text-gray-300">
                            {sampleTestCases[selectedTestCase].input}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Expected Output:</div>
                        {sampleTestCases[selectedTestCase].isCustom ? (
                          <textarea 
                            className="w-full bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-xs text-gray-300 focus:outline-none focus:border-orange-500/50 resize-none"
                            rows={2}
                            value={sampleTestCases[selectedTestCase].output}
                            onChange={(e) => {
                              const newCustom = [...customTestCases];
                              const customIdx = selectedTestCase - (problem.testCases?.filter(tc => tc.isSample).length || 0);
                              newCustom[customIdx].output = e.target.value;
                              setCustomTestCases(newCustom);
                            }}
                            placeholder="Optional expected output"
                          />
                        ) : (
                          <div className="bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-xs text-gray-300">
                            {sampleTestCases[selectedTestCase].output}
                          </div>
                        )}
                      </div>
                      {result.status !== 'none' && result.testCaseOutputs && result.testCaseOutputs[selectedTestCase] !== undefined && (
                        <div>
                          <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Your Output:</div>
                          <div className={cn(
                            "bg-white/5 p-3 rounded-lg border font-mono text-xs text-gray-300",
                            result.testCaseResults?.[selectedTestCase] ? "border-green-500/30" : "border-red-500/30"
                          )}>
                            {result.testCaseOutputs[selectedTestCase]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
