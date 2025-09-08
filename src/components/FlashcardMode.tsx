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
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Controls */}
      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={shuffle}
          className="flex items-center gap-3 btn-primary border px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <Shuffle className="w-5 h-5" />
          <span className="tracking-wide">Shuffle Cards</span>
        </button>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setShowAnswer(false);
          }}
          className="flex items-center bg-teal-600 border border-teal-900 gap-3 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <RotateCcw className="w-5 h-5" />
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
      <div className="mt-12 text-center">
        <button
          onClick={nextCard}
          className="bg-teal-600 border border-teal-900 mr-5 text-white px-12 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
        >
          Next Card →
        </button>
        
        <div className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border inline-block">
          <span className="text-lg font-semibold text-gray-700">
            Card <span className="text-blue-600">{currentIndex + 1}</span> of <span className="text-emerald-600">{shuffledNames.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
};