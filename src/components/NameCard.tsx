import React from 'react';
import { Name } from '../data/names';
import { Heart } from 'lucide-react';

interface NameCardProps {
  name: Name;
  showAnswer: boolean;
  isLearned: boolean;
  onToggleAnswer: () => void;
  onMarkLearned: () => void;
  className?: string;
}

export const NameCard: React.FC<NameCardProps> = ({
  name,
  showAnswer,
  isLearned,
  onToggleAnswer,
  onMarkLearned,
  className = ''
}) => {
  return (
    <div className={`card-gradient rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 ${className}`}>
      {/* Header with number and heart*/}
      <div className="text-white px-6 py-4 sm:px-8 sm:py-6 flex justify-between items-center relative">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-cyan-300/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-xs sm:text-sm font-bold">{name.id}</span>
        </div>
        <button
          onClick={onMarkLearned}
          className={`p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isLearned 
              ? 'bg-red-500 text-white animate-pulse-gentle shadow-lg' 
              : 'bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm'
          }`}
          title={isLearned ? 'Learned!' : 'Mark as learned'}
        >
          <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isLearned ? 'fill-current animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Main content */}
      <div className="p-6 sm:p-10 text-center geometric-pattern relative">
        <div className="mb-6 sm:mb-8 decorative-corner">
          <h2 className="text-4xl sm:text-5xl md:text-6xl arabic-text text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-amber-600 mb-2 sm:mb-4 animate-fadeIn">
            {name.arabic}
          </h2>
        </div>
        <div 
          className="min-h-[120px] sm:min-h-[140px] flex flex-col justify-center cursor-pointer group"
          onClick={onToggleAnswer}
        >
          {!showAnswer ? (
            <div className="text-center animate-slideIn">
              <p className="text-gray-600 mb-4 text-base sm:text-lg">Click to reveal the beautiful meaning</p>
              <div className="reveal-gradient relative w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:animate-glow transition-all duration-300 shadow-lg sm:shadow-xl">
                <span className="text-white font-bold text-base sm:text-lg tracking-wide">Tap To Reveal</span>
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl transliteration-text text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-700 mb-2 sm:mb-4">
                {name.transliteration}
              </h3>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-amber-400 to-emerald-500 mx-auto rounded-full mb-2 sm:mb-4"></div>
              <p className="text-base sm:text-xl text-gray-800 leading-relaxed font-medium max-w-sm sm:max-w-md mx-auto">
                {name.meaning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};