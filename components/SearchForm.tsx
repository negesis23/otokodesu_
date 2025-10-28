import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from './icons/SearchIcon';

interface SearchFormProps {
  initialQuery?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-on-surface-variant" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime..."
            className="outline-none bg-surface-container-high placeholder-on-surface-variant rounded-full py-2.5 px-4 pl-11 w-full border border-transparent focus:ring-2 focus:ring-primary/80 transition"
            required
          />
      </div>
    </form>
  );
};

export default SearchForm;