import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from './icons/SearchIcon';

interface SearchFormProps {
  initialQuery?: string;
  size?: 'default' | 'large';
  className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery = '', size = 'default', className = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
    }
  };

  const sizeClasses = size === 'large'
    ? 'py-4 px-5 pl-14 text-lg rounded-full'
    : 'py-2.5 px-4 pl-11 text-base rounded-full';
  
  const iconSizeClasses = size === 'large' ? 'w-6 h-6' : 'w-5 h-5';
  const iconPositionClasses = size === 'large' ? 'pl-5' : 'pl-4';


  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative">
          <span className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${iconPositionClasses}`}>
            <SearchIcon className={`${iconSizeClasses} text-on-surface-variant`} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime..."
            className={`outline-none bg-surface-container-high placeholder-on-surface-variant w-full border border-transparent focus:ring-2 focus:ring-primary/80 transition ${sizeClasses}`}
            required
          />
      </div>
    </form>
  );
};

export default SearchForm;