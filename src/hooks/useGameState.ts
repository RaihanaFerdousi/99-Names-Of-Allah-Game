import { useState, useEffect } from 'react';
import { Name } from '../data/names';

export type GameMode = 'browse' | 'flashcards' | 'quiz' | 'search';

interface GameState {
  currentIndex: number;
  score: number;
  learnedNames: Set<number>;
  showAnswer: boolean;
  gameMode: GameMode;
  searchQuery: string;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('asma-ul-husna-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        learnedNames: new Set(parsed.learnedNames || [])
      };
    }
    return {
      currentIndex: 0,
      score: 0,
      learnedNames: new Set(),
      showAnswer: false,
      gameMode: 'browse' as GameMode,
      searchQuery: ''
    };
  });

  // Save progress to localStorage
  useEffect(() => {
    const toSave = {
      ...gameState,
      learnedNames: Array.from(gameState.learnedNames)
    };
    localStorage.setItem('asma-ul-husna-progress', JSON.stringify(toSave));
  }, [gameState]);

  const markAsLearned = (id: number) => {
    setGameState(prev => ({
      ...prev,
      learnedNames: new Set([...prev.learnedNames, id])
    }));
  };

  const nextName = () => {
    setGameState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % 99,
      showAnswer: false
    }));
  };

  const previousName = () => {
    setGameState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? 98 : prev.currentIndex - 1,
      showAnswer: false
    }));
  };

  const toggleAnswer = () => {
    setGameState(prev => ({
      ...prev,
      showAnswer: !prev.showAnswer
    }));
  };

  const setGameMode = (mode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
      showAnswer: false
    }));
  };

  const setSearchQuery = (query: string) => {
    setGameState(prev => ({
      ...prev,
      searchQuery: query
    }));
  };

  const incrementScore = () => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + 1
    }));
  };

  const resetProgress = () => {
    setGameState({
      currentIndex: 0,
      score: 0,
      learnedNames: new Set(),
      showAnswer: false,
      gameMode: 'browse',
      searchQuery: ''
    });
    localStorage.removeItem('asma-ul-husna-progress');
  };

  return {
    gameState,
    markAsLearned,
    nextName,
    previousName,
    toggleAnswer,
    setGameMode,
    setSearchQuery,
    incrementScore,
    resetProgress
  };
};