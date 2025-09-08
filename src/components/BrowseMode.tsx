import React from 'react';
import { names } from '../data/names';
import { NameCard } from './NameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BrowseModeProps {
  currentIndex: number;
  showAnswer: boolean;
  learnedNames: Set<number>;
  onNext: () => void;
  onPrevious: () => void;
  onToggleAnswer: () => void;
  onMarkLearned: (id: number) => void;
}

export const BrowseMode: React.FC<BrowseModeProps> = ({
  currentIndex,
  showAnswer,
  learnedNames,
  onNext,
  onPrevious,
  onToggleAnswer,
  onMarkLearned
}) => {
  const currentName = names[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="relative">
        <NameCard
          name={currentName}
          showAnswer={showAnswer}
          isLearned={learnedNames.has(currentName.id)}
          onToggleAnswer={onToggleAnswer}
          onMarkLearned={() => onMarkLearned(currentName.id)}
          className="mx-auto animate-slideIn"
        />

        {/* Navigation */}
        <button
          onClick={onPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/90 backdrop-blur-sm shadow-2xl rounded-full p-4 hover:bg-white transition-all duration-300 border border-amber-200 hover:scale-110 hover:shadow-xl"
          title="Previous name"
        >
          <ChevronLeft className="w-7 h-7 text-gray-700" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/90 backdrop-blur-sm shadow-2xl rounded-full p-4 hover:bg-white transition-all duration-300 border border-amber-200 hover:scale-110 hover:shadow-xl"
          title="Next name"
        >
          <ChevronRight className="w-7 h-7 text-gray-700" />
        </button>
      </div>

      {/* Progress */}
      <div className="mt-12 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="text-lg text-gray-600 font-medium">Progress:</span>
          <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">{currentIndex + 1} of 99</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 max-w-lg mx-auto shadow-inner">
          <div 
            className="progress-bar h-4 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / 99) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-6 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">←</kbd>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">→</kbd>
            <span className="text-sm text-gray-600">Navigate</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Space</kbd>
            <span className="text-sm text-gray-600">Reveal</span>
          </div>
        </div>
      </div>
    </div>
  );
};