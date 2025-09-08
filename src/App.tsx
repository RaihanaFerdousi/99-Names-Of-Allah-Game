import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { BrowseMode } from './components/BrowseMode';
import { FlashcardMode } from './components/FlashcardMode';
import { QuizMode } from './components/QuizMode';
import { SearchMode } from './components/SearchMode';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    gameState,
    markAsLearned,
    nextName,
    previousName,
    toggleAnswer,
    setGameMode,
    setSearchQuery,
    incrementScore,
    resetProgress
  } = useGameState();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.gameMode === 'browse') {
        switch (e.key) {
          case 'ArrowRight':
            nextName();
            break;
          case 'ArrowLeft':
            previousName();
            break;
          case ' ':
            e.preventDefault();
            toggleAnswer();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameMode, nextName, previousName, toggleAnswer]);

  const renderMode = () => {
    switch (gameState.gameMode) {
      case 'browse':
        return (
          <BrowseMode
            currentIndex={gameState.currentIndex}
            showAnswer={gameState.showAnswer}
            learnedNames={gameState.learnedNames}
            onNext={nextName}
            onPrevious={previousName}
            onToggleAnswer={toggleAnswer}
            onMarkLearned={markAsLearned}
          />
        );
      case 'flashcards':
        return (
          <FlashcardMode
            learnedNames={gameState.learnedNames}
            onMarkLearned={markAsLearned}
          />
        );
      case 'quiz':
        return (
          <QuizMode
            score={gameState.score}
            onScoreIncrement={incrementScore}
          />
        );
      case 'search':
        return (
          <SearchMode
            searchQuery={gameState.searchQuery}
            onSearchChange={setSearchQuery}
            learnedNames={gameState.learnedNames}
            onMarkLearned={markAsLearned}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 geometric-pattern">
      <Navigation
        currentMode={gameState.gameMode}
        onModeChange={setGameMode}
        learnedCount={gameState.learnedNames.size}
      />
      
      <main className="pb-12">
        {renderMode()}
      </main>

      {/* Reset progress button */}
      {gameState.learnedNames.size > 0 && (
        <button
          onClick={resetProgress}
          className="fixed bottom-6 right-6 font-bold card-gradient text-teal-700 px-5 py-3 rounded-full text-xs transition-all duration-300 shadow-xl hover:scale-110 backdrop-blur-sm border border-amber-400"
          title="Reset all progress"
        >
          Restart
        </button>
      )}
    </div>
  );
}

export default App;