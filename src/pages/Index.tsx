
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { Sparkles, Brain, Clock, Target } from 'lucide-react';

const Index = () => {
  return (
    <div className="container py-8 px-4 mx-auto">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-game-tertiary mb-4">Beat Boredom with Mini-Games</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Choose from our collection of quick and fun mini-games designed to keep you entertained
            whenever boredom strikes. Challenge yourself and track your high scores!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <GameCard 
            title="Memory Match" 
            description="Test your memory by matching pairs of cards. Complete the game in as few moves as possible!"
            icon={Brain}
            path="/memory-match"
            color="#9b87f5"
          />
          
          <GameCard 
            title="Word Scramble" 
            description="Unscramble words against the clock. Every correct answer gives you more time!"
            icon={Sparkles}
            path="/word-scramble"
            color="#7E69AB"
          />
          
          <GameCard 
            title="Quick Clicker" 
            description="Test your reflexes by clicking targets as quickly as possible before time runs out."
            icon={Target}
            path="/quick-clicker"
            color="#6E59A5"
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-3 text-game-tertiary">Why Play Mini-Games?</h2>
          <ul className="space-y-3">
            <li className="flex gap-2 items-center">
              <Clock className="h-5 w-5 text-game-primary" />
              <span>Perfect for short breaks or waiting times</span>
            </li>
            <li className="flex gap-2 items-center">
              <Brain className="h-5 w-5 text-game-primary" />
              <span>Keeps your mind active and engaged</span>
            </li>
            <li className="flex gap-2 items-center">
              <Target className="h-5 w-5 text-game-primary" />
              <span>Challenge yourself to beat your high scores</span>
            </li>
            <li className="flex gap-2 items-center">
              <Sparkles className="h-5 w-5 text-game-primary" />
              <span>Have fun while building skills like reflexes and memory</span>
            </li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
