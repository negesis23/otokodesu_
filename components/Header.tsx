
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="p-5 flex items-center gap-4 w-full">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center justify-center p-3 font-medium rounded-full bg-surface text-text transition hover:bg-surface/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Go back"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <h1 className="text-xl md:text-2xl font-bold capitalize truncate">{title}</h1>
    </header>
  );
};

export default Header;