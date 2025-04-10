
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RotateCw, Check, Timer, Trophy } from 'lucide-react';

const WORDS = [
  'REACT', 'GAME', 'CODING', 'PUZZLE', 'MATCH', 'FUN', 'PLAY',
  'LEVEL', 'SCORE', 'WINNER', 'BONUS', 'ROUND', 'CHALLENGE'
];

const WordScramble = () => {
  const { toast } = useToast();
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('wordScrambleBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return;
    
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  // Start a new game
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    nextWord();
  };

  // End the current game
  const endGame = () => {
    setGameActive(false);
    
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('wordScrambleBestScore', score.toString());
      toast({
        title: "New High Score!",
        description: `You scored ${score} points!`,
      });
    } else {
      toast({
        title: "Game Over",
        description: `Final score: ${score}`,
      });
    }
  };

  // Get the next word
  const nextWord = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
    setScrambled(scrambleWord(randomWord));
    setGuess('');
  };

  // Scramble the word
  const scrambleWord = (word: string) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  // Check the user's guess
  const checkGuess = () => {
    if (guess.toUpperCase() === word) {
      const points = Math.max(1, Math.ceil(word.length / 2));
      setScore(score + points);
      
      toast({
        title: "Correct!",
        description: `+${points} points`,
        duration: 1000,
      });
      
      nextWord();
      // Add 3 seconds to the timer as a reward
      setTimeLeft(prev => Math.min(prev + 3, 30));
    } else {
      toast({
        title: "Incorrect",
        description: "Try again!",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkGuess();
  };

  return (
    <div className="game-container bg-white p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-game-tertiary">Word Scramble</h2>
        <div className="flex gap-2">
          <div className="text-sm bg-game-accent2 px-3 py-1 rounded-full flex items-center gap-1">
            <Timer className="h-3 w-3" /> {timeLeft}s
          </div>
          <div className="text-sm bg-game-accent1 px-3 py-1 rounded-full">
            Score: {score}
          </div>
          {bestScore > 0 && (
            <div className="text-sm bg-game-accent3 px-3 py-1 rounded-full flex items-center gap-1">
              <Trophy className="h-3 w-3" /> {bestScore}
            </div>
          )}
        </div>
      </div>

      {gameActive ? (
        <>
          <div className="mb-6 text-center">
            <div className="text-3xl font-bold mb-2 tracking-wider">{scrambled}</div>
            <div className="text-gray-500 text-sm">Unscramble the word</div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input 
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value.toUpperCase())}
              placeholder="Enter your guess"
              className="text-center text-lg"
              autoComplete="off"
              autoFocus
            />
            
            <Button 
              type="submit" 
              className="game-button flex items-center justify-center gap-2"
            >
              <Check className="h-4 w-4" /> Check Answer
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">How to Play</h3>
            <p className="text-gray-600">
              Unscramble as many words as you can before the timer runs out. 
              Each correct answer earns points and adds time to the clock!
            </p>
          </div>

          {score > 0 && (
            <div className="mb-6 p-4 bg-game-accent2 rounded-lg">
              <p className="font-bold">Game Over!</p>
              <p>Your score: {score}</p>
              {score >= bestScore && score > 0 && (
                <p className="mt-1 font-bold flex items-center justify-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" /> New Best Score!
                </p>
              )}
            </div>
          )}

          <Button 
            onClick={startGame}
            className="game-button flex items-center justify-center gap-2"
          >
            <RotateCw className="h-4 w-4" /> Start Game
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordScramble;
