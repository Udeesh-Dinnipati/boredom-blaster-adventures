import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Target, Timer, Trophy, Play, RotateCw } from 'lucide-react';

const QuickClicker = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targetStyle, setTargetStyle] = useState({
    top: '50%',
    left: '50%',
    size: 'h-12 w-12',
  });
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('quickClickerBestScore');
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
    
    timerRef.current = setTimeout(() => {
      setTimeLeft(prev => prev - 0.1);
    }, 100);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, gameActive]);

  // Start a new game
  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameActive(true);
    moveTarget();
  };

  // End the current game
  const endGame = () => {
    setGameActive(false);
    
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('quickClickerBestScore', score.toString());
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

  // Move the target to a random position
  const moveTarget = () => {
    if (!gameAreaRef.current) return;

    const gameArea = gameAreaRef.current;
    const gameRect = gameArea.getBoundingClientRect();
    
    // Get a random position within the game area
    // Keep a margin to ensure target stays fully visible
    const margin = 60; 
    const maxX = gameRect.width - margin;
    const maxY = gameRect.height - margin; 
    
    // Generate random positions
    const newX = Math.max(margin/2, Math.random() * maxX);
    const newY = Math.max(margin/2, Math.random() * maxY);
    
    // Randomize size between small, medium, and large
    const sizes = ['h-8 w-8', 'h-12 w-12', 'h-16 w-16'];
    const newSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    setTargetStyle({
      top: `${newY}px`,
      left: `${newX}px`,
      size: newSize,
    });
  };

  // Handle target click
  const handleTargetClick = () => {
    if (!gameActive) return;
    
    // Add points based on the target size (smaller = more points)
    let points = 1;
    if (targetStyle.size === 'h-8 w-8') points = 3;  // Small targets worth more
    else if (targetStyle.size === 'h-12 w-12') points = 2;  // Medium targets
    
    setScore(score + points);
    moveTarget();
    
    // Make the game slightly harder as you progress
    if (score % 10 === 9) {
      toast({
        title: "Bonus!",
        description: "+0.5 seconds",
        duration: 1000,
      });
      setTimeLeft(prev => prev + 0.5); // Add a half-second bonus every 10 points
    }
  };

  return (
    <div className="game-container bg-white p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-game-tertiary">Quick Clicker</h2>
        <div className="flex gap-2">
          <div className="text-sm bg-game-accent2 px-3 py-1 rounded-full flex items-center gap-1">
            <Timer className="h-3 w-3" /> {timeLeft.toFixed(1)}s
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
        <div 
          ref={gameAreaRef}
          className="relative bg-game-background border border-dashed border-game-secondary rounded-lg mb-4"
          style={{ height: '300px' }}
        >
          <button
            className={`absolute bg-game-primary rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${targetStyle.size} hover:brightness-110 transition-all active:scale-95`}
            style={{ top: targetStyle.top, left: targetStyle.left }}
            onClick={handleTargetClick}
          >
            <Target className="text-white" />
          </button>
        </div>
      ) : (
        <div className="text-center my-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">How to Play</h3>
            <p className="text-gray-600">
              Click on the targets as quickly as you can before time runs out. 
              Smaller targets are worth more points!
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
        </div>
      )}
      
      <div className="flex justify-center">
        <Button
          className="game-button flex items-center gap-2"
          onClick={gameActive ? endGame : startGame}
        >
          {gameActive ? (
            <>
              <RotateCw className="h-4 w-4" /> End Game
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Start Game
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuickClicker;
