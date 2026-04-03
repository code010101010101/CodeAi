import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import ProfilePage from './pages/ProfilePage';
import DiscussPage from './pages/DiscussPage';
import ContestPage from './pages/ContestPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1a1a1a] font-sans selection:bg-orange-500/30 selection:text-orange-200">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/problems/:id" element={<ProblemDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/discuss" element={<DiscussPage />} />
            <Route path="/contest" element={<ContestPage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
