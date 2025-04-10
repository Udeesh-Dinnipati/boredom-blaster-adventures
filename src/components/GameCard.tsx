
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

const GameCard = ({ title, description, icon: Icon, path, color }: GameCardProps) => {
  return (
    <Link to={path} className="block">
      <div className="game-card card-hover">
        <div className={`inline-flex p-3 rounded-lg mb-4`} style={{ backgroundColor: color + '20' }}>
          <Icon className="h-6 w-6" style={{ color: color }} />
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default GameCard;
