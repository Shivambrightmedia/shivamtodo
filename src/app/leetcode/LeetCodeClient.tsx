"use client";
import { useState } from 'react';
import { Search, ChevronLeft, Code2, Brain, Zap, Terminal, Lightbulb, BookOpen, Map, Sun, Moon } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Problem } from './types';
import { RECURSION_PROBLEMS } from './data/recursion';
import { BACKTRACKING_PROBLEMS } from './data/backtracking';
import { BINARY_TREE_PROBLEMS } from './data/binarytrees';

const PROBLEMS: Problem[] = [...RECURSION_PROBLEMS, ...BACKTRACKING_PROBLEMS, ...BINARY_TREE_PROBLEMS];

export default function LeetCodeClient() {
  const [activeTab, setActiveTab] = useState<'Recursion' | 'Backtracking' | 'Binary Trees'>('Recursion');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const SDE_ORDER = [
    // Recursion (keeping original order)
    'Fibonacci Number',
    'Reverse String',
    'Factorial',
    'Binary Search',
    'Sum of Digits',
    'Merge Sort',
    'Tower of Hanoi',
    'Climbing Stairs',
    'Count Inversions',
    // Backtracking (SDE Sheet Order)
    'Permutations',
    'N-Queens',
    'Sudoku Solver',
    'M Coloring Problem',
    'Rat in a Maze',
    'Word Break (print all ways)',
    // Other Backtracking
    'Subsets (Power Set)',
    'Subsets II',
    'Combination Sum I',
    'Combination Sum II',
    'Word Search',
    'Palindrome Partitioning',
    "Knight's Tour"
  ];

  const filteredProblems = PROBLEMS.filter(p => 
    p.category === activeTab && 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    let indexA = SDE_ORDER.indexOf(a.title);
    let indexB = SDE_ORDER.indexOf(b.title);
    if (indexA === -1) indexA = 999;
    if (indexB === -1) indexB = 999;
    return indexA - indexB;
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (selectedProblem) {
    return (
      <div className={`leetcode-wrapper ${theme}`}>
        <div className="problem-detail-view">
          <header className="detail-header">
            <button onClick={() => setSelectedProblem(null)} className="back-btn-modern">
              <ChevronLeft size={20} />
              <span>GO BACK</span>
            </button>
            <div className="title-area">
              <span className={`difficulty-indicator ${selectedProblem.difficulty.toLowerCase()}`}>
                {selectedProblem.difficulty}
              </span>
              <h1 className="detail-title">{selectedProblem.title}</h1>
            </div>
          </header>

          <div className="detail-grid">
            <div className="info-column">
              <section className="detail-section glass-card-modern">
                <div className="section-title">
                  <Terminal size={18} />
                  <h2>PROBLEM DESCRIPTION</h2>
                </div>
                <p className="section-content">{selectedProblem.description}</p>
              </section>

              <section className="detail-section glass-card-modern">
                <div className="section-title">
                  <Lightbulb size={18} />
                  <h2>CORE APPROACH</h2>
                </div>
                <p className="section-content">{selectedProblem.approach}</p>
              </section>

              <div className="side-by-side">
                <section className="detail-section glass-card-modern">
                  <div className="section-title">
                    <BookOpen size={18} />
                    <h2>EXAMPLE</h2>
                  </div>
                  <div className="example-box">
                    <code className="section-content">{selectedProblem.example}</code>
                  </div>
                </section>

                <section className="detail-section glass-card-modern">
                  <div className="section-title">
                    <Zap size={18} />
                    <h2>COMPLEXITY</h2>
                  </div>
                  <p className="section-content highlight-text">{selectedProblem.complexity}</p>
                </section>
              </div>

              <section className="detail-section glass-card-modern">
                <div className="section-title">
                  <Map size={18} />
                  <h2>VISUAL DIAGRAM (ASCII)</h2>
                </div>
                <pre className="diagram-box">
                  <code>{selectedProblem.diagram}</code>
                </pre>
              </section>

            </div>

            <div className="code-column">
              <section className="detail-section glass-card-modern code-card">
                <div className="section-title">
                  <Code2 size={18} />
                  <h2>JAVA IMPLEMENTATION</h2>
                </div>
                <SyntaxHighlighter 
                  language="java" 
                  style={theme === 'dark' ? vscDarkPlus : vs}
                  customStyle={{
                    padding: '1.5rem',
                    margin: 0,
                    background: 'var(--code-bg)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6'
                  }}
                >
                  {selectedProblem.code}
                </SyntaxHighlighter>
              </section>
            </div>
          </div>
        </div>

        <style jsx>{`
          .leetcode-wrapper {
            --bg: #000000;
            --text: #ffffff;
            --text-muted: rgba(255, 255, 255, 0.5);
            --card-bg: #080808;
            --border: #1a1a1a;
            --code-bg: #050505;
            --code-text: #d4d4d4;
            --highlight: #ffffff;
            --btn-hover: #111111;
            
            min-height: 100vh;
            background: var(--bg);
            color: var(--text);
            padding-top: 64px;
            transition: all 0.3s ease;
            overflow-x: hidden;
            width: 100vw;
            box-sizing: border-box;
          }
          
          .leetcode-wrapper.light {
            --bg: #f9fafb;
            --text: #111827;
            --text-muted: rgba(17, 24, 39, 0.6);
            --card-bg: #ffffff;
            --border: #e5e7eb;
            --code-bg: #f3f4f6;
            --code-text: #1f2937;
            --highlight: #000000;
            --btn-hover: #e5e7eb;
          }

          .problem-detail-view {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            padding: 4rem 2rem;
            animation: slideUp 0.4s ease-out;
            box-sizing: border-box;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .detail-header {
            margin-bottom: 3rem;
          }
          .back-btn-modern {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text);
            padding: 0.6rem 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 800;
            font-size: 0.75rem;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s;
            margin-bottom: 2rem;
          }
          .back-btn-modern:hover {
            border-color: var(--highlight);
            background: var(--btn-hover);
          }
          .title-area {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .difficulty-indicator {
            font-size: 0.7rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .difficulty-indicator.easy { color: #10b981; }
          .difficulty-indicator.medium { color: #f59e0b; }
          .difficulty-indicator.hard { color: #ef4444; }
          .detail-title {
            font-size: 3rem;
            font-weight: 900;
            letter-spacing: -1px;
            margin: 0;
            color: var(--text);
          }
          .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 1.5rem;
            align-items: start;
            min-width: 0;
          }
          .info-column, .code-column {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            min-width: 0;
          }
          .side-by-side {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .glass-card-modern {
            background: var(--card-bg);
            border: 1px solid var(--border);
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            box-sizing: border-box;
            max-width: 100%;
          }
          .code-card {
            padding: 0;
            overflow: hidden;
            background: var(--card-bg);
          }
          .code-card .section-title {
            padding: 1.5rem 1.5rem 0;
          }
          .code-block {
            padding: 1.5rem;
            margin: 0;
            overflow-x: auto;
            background: var(--code-bg);
            border-top: 1px solid var(--border);
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            color: var(--code-text);
            box-sizing: border-box;
            width: 100%;
            display: block;
          }
          .diagram-box {
            background: var(--code-bg);
            color: var(--code-text);
            padding: 1.5rem;
            border-radius: 6px;
            border: 1px dashed var(--border);
            font-family: 'Consolas', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            box-sizing: border-box;
            width: 100%;
            display: block;
          }
          .section-title {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
            color: var(--text-muted);
          }
          .section-title h2 {
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 1px;
            margin: 0;
            color: var(--text);
          }
          .section-content {
            font-size: 1rem;
            line-height: 1.7;
            color: var(--text);
            opacity: 0.9;
            margin: 0;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
          }
          .example-box {
            background: var(--code-bg);
            padding: 1.25rem;
            border-left: 2px solid var(--highlight);
          }
          .highlight-text {
            color: var(--highlight);
            font-weight: 700;
          }
          @media (max-width: 1024px) {
            .detail-grid { grid-template-columns: 1fr; }
            .side-by-side { grid-template-columns: 1fr; }
            .detail-title { font-size: 2.2rem; }
          }
          @media (max-width: 768px) {
            .problem-detail-view { padding: 1.5rem 1rem; margin-top: -1rem; }
            .detail-title { font-size: 1.8rem; }
            .glass-card-modern { padding: 1.25rem; }
            .code-block, .diagram-box { padding: 1rem; font-size: 0.8rem; }
            .title-area { gap: 0.25rem; }
          }
          @media (max-width: 480px) {
            .problem-detail-view { padding: 1rem 0.5rem; }
            .detail-title { font-size: 1.5rem; line-height: 1.2; }
            .glass-card-modern { padding: 1rem; border-radius: 6px; }
            .code-block, .diagram-box { padding: 0.75rem; font-size: 0.75rem; border-radius: 4px; }
            .back-btn-modern { width: 100%; justify-content: center; padding: 0.75rem; margin-bottom: 1.5rem; }
            .section-content { font-size: 0.9rem; }
            .info-column, .code-column { gap: 1rem; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`leetcode-wrapper ${theme}`}>
      <header className="leetcode-header">
        <div className="header-content">
          <div className="title-group">
            <Code2 size={32} className="title-icon" />
            <h1 className="main-title">LEETCODE</h1>
          </div>
          <div className="header-right">
            <p className="subtitle">EXPLANATIONS & MUST-DO DSA SETS</p>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="leetcode-content">
        <div className="controls">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'Recursion' ? 'active' : ''}`}
              onClick={() => setActiveTab('Recursion')}
            >
              <Brain size={18} />
              RECURSION
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Backtracking' ? 'active' : ''}`}
              onClick={() => setActiveTab('Backtracking')}
            >
              <Zap size={18} />
              BACKTRACKING
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Binary Trees' ? 'active' : ''}`}
              onClick={() => setActiveTab('Binary Trees')}
            >
              <Map size={18} />
              BINARY TREES
            </button>
          </div>

          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="SEARCH PROBLEMS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="problems-grid">
          {filteredProblems.map((problem) => (
            <div 
              key={problem.id} 
              onClick={() => setSelectedProblem(problem)}
              className="problem-card clickable"
            >
              <div className="card-top">
                <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
                <Terminal size={16} className="link-icon" />
              </div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="card-desc-short">{problem.description.substring(0, 80)}...</p>
              <div className="card-footer">
                <span className="category-tag">VIEW DETAILS & DIAGRAM →</span>
              </div>
            </div>
          ))}
          {filteredProblems.length === 0 && (
            <div className="empty-state">
              <p>NO PROBLEMS FOUND FOR "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .leetcode-wrapper {
          --bg: #000000;
          --text: #ffffff;
          --header-bg: #050505;
          --card-bg: #0a0a0a;
          --border: #1a1a1a;
          --input-bg: #111111;
          --card-hover: #111111;
          --highlight: #ffffff;
          
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding-top: 64px;
          transition: all 0.3s ease;
        }
        
        .leetcode-wrapper.light {
          --bg: #f9fafb;
          --text: #111827;
          --header-bg: #ffffff;
          --card-bg: #ffffff;
          --border: #e5e7eb;
          --input-bg: #f3f4f6;
          --card-hover: #f3f4f6;
          --highlight: #000000;
        }

        .leetcode-header {
          padding: 4rem 2rem 2rem;
          border-bottom: 1px solid var(--border);
          background: var(--header-bg);
        }
        .header-content { 
          max-width: 1200px; 
          margin: 0 auto; 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-end; 
          flex-wrap: wrap;
          gap: 1rem;
        }
        .title-group { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
        .title-icon { color: var(--text); }
        .main-title { font-size: 3.5rem; font-weight: 900; letter-spacing: 4px; margin: 0; color: var(--text); }
        .header-right { display: flex; align-items: center; gap: 1.5rem; }
        .subtitle { font-size: 0.9rem; font-weight: 700; letter-spacing: 2px; opacity: 0.5; margin: 0; color: var(--text); }
        
        .theme-toggle {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .theme-toggle:hover {
          background: var(--input-bg);
          border-color: var(--text);
        }

        .leetcode-content { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
        .controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; gap: 2rem; flex-wrap: wrap; }
        .tabs { display: flex; gap: 1rem; }
        .tab-btn {
          background: var(--input-bg);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 0.8rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.2s;
        }
        .tab-btn:hover { border-color: var(--text); }
        .tab-btn.active { background: var(--text); color: var(--bg); border-color: var(--text); }
        
        .search-bar { flex: 1; max-width: 400px; display: flex; align-items: center; gap: 1rem; background: var(--input-bg); padding: 0.8rem 1.2rem; border: 1px solid var(--border); border-radius: 4px; }
        .search-icon { opacity: 0.4; color: var(--text); }
        .search-input { background: transparent; border: none; color: var(--text); font-size: 0.9rem; font-weight: 600; width: 100%; outline: none; }
        
        .problems-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .problem-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .problem-card:hover { border-color: var(--text); transform: translateY(-5px); background: var(--card-hover); }
        .difficulty-badge { font-size: 0.65rem; font-weight: 900; padding: 0.3rem 0.7rem; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px;}
        .difficulty-badge.easy { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981;}
        .difficulty-badge.medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b;}
        .difficulty-badge.hard { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444;}
        
        .problem-title { font-size: 1.25rem; font-weight: 800; margin: 0; line-height: 1.4; color: var(--text); }
        .card-desc-short { font-size: 0.85rem; opacity: 0.7; line-height: 1.6; margin: 0; color: var(--text); }
        .category-tag { font-size: 0.7rem; font-weight: 900; color: var(--text); letter-spacing: 1px; }
        .empty-state { grid-column: 1 / -1; text-align: center; padding: 4rem; border: 1px dashed var(--border); opacity: 0.5; color: var(--text); }
        
        @media (max-width: 768px) {
          .leetcode-header { padding: 3rem 1.5rem 1.5rem; }
          .main-title { font-size: 2.5rem; }
          .tabs { flex-direction: column; width: 100%; }
          .tab-btn { justify-content: center; width: 100%; }
          .header-content { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .header-right { width: 100%; justify-content: space-between; align-items: center; }
          .controls { flex-direction: column; align-items: stretch; gap: 1.25rem; }
          .search-bar { max-width: 100%; width: 100%; }
          .leetcode-content { padding: 2rem 1.5rem; }
        }
        @media (max-width: 480px) {
          .leetcode-header { padding: 2rem 1rem 1.5rem; }
          .main-title { font-size: 2rem; }
          .subtitle { font-size: 0.75rem; }
          .leetcode-content { padding: 1.5rem 1rem; }
          .problems-grid { grid-template-columns: 1fr; }
          .problem-card { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
