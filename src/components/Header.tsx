
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 mb-6 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="h-7 w-7 text-game-primary" />
        <h1 className="text-2xl font-bold text-game-tertiary">Boredom Blaster</h1>
      </div>
      <div className="text-sm text-gray-500">Wave boredom goodbye!</div>
    </header>
  );
};

export default Header;
