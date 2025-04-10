
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCw, Trophy } from 'lucide-react';

const CARDS = ['🍕', '🌮', '🍔', '🍦', '🍓', '🍇', '🥑', '🍋'];

const MemoryMatch = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Initialize or reset the game
  const initGame = () => {
    // Double the cards and shuffle them
    const shuffledCards = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  };

  // Initialize game on component mount
  useEffect(() => {
    initGame();
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('memoryMatchBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Check if the game is over after matches change
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameOver(true);
      // Update best score
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem('memoryMatchBestScore', moves.toString());
        toast({
          title: "New High Score!",
          description: `You completed the game in ${moves} moves!`,
        });
      } else {
        toast({
          title: "Game Completed!",
          description: `You completed the game in ${moves} moves!`,
        });
      }
    }
  }, [matched, cards.length, bestScore, moves, toast]);

  // Handle card click
  const handleCardClick = (index: number) => {
    // Prevent clicking if already flipped or matched
    if (flipped.includes(index) || matched.includes(index)) {
      return;
    }

    // Don't allow more than 2 cards to be flipped at once
    if (flipped.length === 2) {
      return;
    }

    // Flip the card
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      const [first, second] = newFlipped;
      
      // If cards match, add to matched array
      if (cards[first] === cards[second]) {
        setTimeout(() => {
          setMatched([...matched, first, second]);
          setFlipped([]);
        }, 500);
      } else {
        // If cards don't match, flip them back
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="game-container bg-white p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-game-tertiary flex items-center gap-2">
          <Sparkles className="h-5 w-5" /> Memory Match
        </h2>
        <div className="flex gap-2">
          <div className="text-sm bg-game-accent2 px-3 py-1 rounded-full">
            Moves: {moves}
          </div>
          {bestScore && (
            <div className="text-sm bg-game-accent1 px-3 py-1 rounded-full flex items-center gap-1">
              <Trophy className="h-3 w-3" /> {bestScore}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-3xl 
              rounded-lg cursor-pointer transition-all duration-300
              ${flipped.includes(index) || matched.includes(index) 
                ? 'bg-white shadow-md rotate-y-0' 
                : 'bg-game-primary text-game-primary shadow-lg rotate-y-180'}
              ${matched.includes(index) ? 'bg-game-accent2' : ''}
            `}
            onClick={() => handleCardClick(index)}
          >
            {(flipped.includes(index) || matched.includes(index)) && card}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          className="game-button flex items-center gap-2"
          onClick={initGame}
        >
          <RotateCw className="h-4 w-4" /> New Game
        </Button>
      </div>

      {gameOver && (
        <div className="mt-6 p-4 bg-game-accent3 rounded-lg text-center animate-fade-in">
          <h3 className="font-bold text-lg mb-1">Game Completed!</h3>
          <p>You finished in {moves} moves</p>
          {bestScore === moves && (
            <p className="mt-1 font-bold flex items-center justify-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" /> New Best Score!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;
