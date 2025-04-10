
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemoryMatch from '@/components/games/MemoryMatch';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MemoryMatchPage = () => {
  return (
    <div className="container py-8 px-4 mx-auto">
      <Header />
      
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2 text-game-tertiary">
            <ChevronLeft className="h-4 w-4" /> Back to Games
          </Button>
        </Link>
      </div>
      
      <div className="max-w-lg mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-4 text-game-tertiary text-center">Memory Match</h2>
        <p className="text-gray-600 text-center mb-6">
          Test your memory by finding matching pairs of cards. Try to complete the game in as few moves as possible!
        </p>
        
        <MemoryMatch />
      </div>
      
      <Footer />
    </div>
  );
};

export default MemoryMatchPage;
