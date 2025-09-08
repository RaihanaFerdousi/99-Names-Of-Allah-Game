import React, { useState, useEffect } from 'react';
import { names } from '../data/names';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

interface QuizModeProps {
  score: number;
  onScoreIncrement: () => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({
  score,
  onScoreIncrement
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Array<{
    name: typeof names[0];
    options: string[];
    correct: string;
  }>>([]);

  // Generate quiz questions
  useEffect(() => {
    const generateQuestions = () => {
      const shuffledNames = [...names].sort(() => Math.random() - 0.5).slice(0, 10);
      
      return shuffledNames.map(name => {
        const allMeanings = names.map(n => n.meaning);
        const incorrectMeanings = allMeanings
          .filter(m => m !== name.meaning)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        const options = [name.meaning, ...incorrectMeanings]
          .sort(() => Math.random() - 0.5);

        return {
          name,
          options,
          correct: name.meaning
        };
      });
    };

    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestion].correct) {
      onScoreIncrement();
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      alert(`Quiz completed! Your score: ${score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0)}/${questions.length}`);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    // Regenerate questions
    const generateQuestions = () => {
      const shuffledNames = [...names].sort(() => Math.random() - 0.5).slice(0, 10);
      
      return shuffledNames.map(name => {
        const allMeanings = names.map(n => n.meaning);
        const incorrectMeanings = allMeanings
          .filter(m => m !== name.meaning)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        const options = [name.meaning, ...incorrectMeanings]
          .sort(() => Math.random() - 0.5);

        return {
          name,
          options,
          correct: name.meaning
        };
      });
    };
    setQuestions(generateQuestions());
  };

  if (questions.length === 0) {
    return <div className="text-center py-8">Loading quiz...</div>;
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Quiz header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-6 mb-6">
          <span className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-6 py-3 rounded-full text-lg font-bold shadow-lg border border-blue-200">
            Question {currentQuestion + 1}/10
          </span>
          <span className="bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 px-6 py-3 rounded-full text-lg font-bold flex items-center gap-2 shadow-lg border border-emerald-200">
            <Trophy className="w-5 h-5" />
            Score: {score}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 max-w-lg mx-auto shadow-inner">
          <div 
            className="progress-bar h-4 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="card-gradient rounded-3xl overflow-hidden mb-12 animate-slideIn">
        <div className="text-white px-8 py-8 text-center">
          <h2 className="text-4xl arabic-text mb-4">
            {question.name.arabic}
          </h2>
          <p className="text-2xl transliteration-text">{question.name.transliteration}</p>
        </div>
        
        <div className="p-8 text-center geometric-pattern">
          <p className="text-xl text-gray-700 mb-8 font-semibold">What does this beautiful name mean?</p>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`w-full p-6 rounded-2xl text-left font-semibold transition-all duration-300 transform hover:scale-102 ${
                  !showResult
                    ? 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg border border-gray-200 hover:shadow-xl'
                    : option === question.correct
                    ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-2 border-green-400 shadow-lg'
                    : selectedAnswer === option
                    ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-2 border-red-400 shadow-lg'
                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option}</span>
                  {showResult && (
                    <>
                      {option === question.correct && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {selectedAnswer === option && option !== question.correct && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result and navigation */}
      {showResult && (
        <div className="text-center">
          <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold mb-8 text-lg shadow-xl ${
            isCorrect 
              ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-300' 
              : 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-300'
          }`}>
            {isCorrect ? (
              <>
                <CheckCircle className="w-6 h-6" />
                Excellent! ✨
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6" />
                Not quite right
              </>
            )}
          </div>

          <div className="space-x-6">
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={restartQuiz}
                className="text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
              >
                🎯 Start New Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};