import React, { useState } from 'react';
import { names } from '../data/names';
import { NameCard } from './NameCard';
import { Shuffle, RotateCcw } from 'lucide-react';

interface FlashcardModeProps {
  learnedNames: Set<number>;
  onMarkLearned: (id: number) => void;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({
  learnedNames,
  onMarkLearned
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledNames, setShuffledNames] = useState(names);

  const shuffle = () => {
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    setShuffledNames(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledNames.length);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const currentName = shuffledNames[currentIndex];

  return (
    <div className="max-w-xs sm:max-w-md md:max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        <button
          onClick={shuffle}
          className="flex-1 flex items-center justify-center gap-2 sm:gap-3 btn-primary border px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
        >
          <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="tracking-wide">Shuffle Cards</span>
        </button>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setShowAnswer(false);
          }}
          className="flex-1 flex items-center justify-center bg-teal-600 border border-teal-900 gap-2 sm:gap-3 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="tracking-wide">Reset</span>
        </button>
      </div>

      <div className="relative">
        <NameCard
          name={currentName}
          showAnswer={showAnswer}
          isLearned={learnedNames.has(currentName.id)}
          onToggleAnswer={toggleAnswer}
          onMarkLearned={() => onMarkLearned(currentName.id)}
          className="mx-auto animate-slideIn"
        />
      </div>

      {/* Navigation */}
      <div className="mt-8 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={nextCard}
          className="bg-teal-600 border border-teal-900 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-lg flex-1 sm:flex-none"
        >
          Next Card →
        </button>
        
        <div className="bg-white/70 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg border inline-block">
          <span className="text-sm sm:text-lg font-semibold text-gray-700">
            Card <span className="text-blue-600">{currentIndex + 1}</span> of <span className="text-emerald-600">{shuffledNames.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
};