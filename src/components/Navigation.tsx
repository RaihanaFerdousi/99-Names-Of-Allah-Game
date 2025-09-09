import React from 'react';
import { GameMode } from '../hooks/useGameState';
import { Book, Zap, HelpCircle, Search } from 'lucide-react';

interface NavigationProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  learnedCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  onModeChange,
  learnedCount
}) => {
  const modes = [
    { id: 'browse' as GameMode, label: 'Browse', icon: Book },
    { id: 'flashcards' as GameMode, label: 'Flashcards', icon: Zap },
    { id: 'quiz' as GameMode, label: 'Quiz', icon: HelpCircle },
    { id: 'search' as GameMode, label: 'Search', icon: Search }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-2xl border-b border-amber-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl arabic-text bg-gradient-to-r from-blue-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent mb-2 sm:mb-3 animate-fadeIn">
            أَسْمَاءُ اللهِ الْحُسْنَى
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mb-3 sm:mb-4">The 99 Beautiful Names of Allah</p>
          
          {/* Learnt Progress Bar */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <span className="bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 px-4 sm:px-6 py-1 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg border border-emerald-200">
              {learnedCount}/99 Learned
            </span>
            <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
              <div 
                className="progress-bar h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{ width: `${(learnedCount / 99) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-semibold">
              {Math.round((learnedCount / 99) * 100)}%
            </span>
          </div>
        </div>

        {/* Mode Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
          {modes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onModeChange(id)}
              className="nav-item flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 border rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 transform hover:scale-105"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="tracking-wide">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};