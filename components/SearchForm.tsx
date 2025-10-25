
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
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-3.5">
      <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-text/50" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an anime..."
            className="outline-none bg-surface placeholder-text/50 rounded-full py-3 px-5 pl-12 w-full focus:ring-2 focus:ring-primary/50"
            required
          />
      </div>
      <button type="submit" className="inline-flex items-center capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-primary text-primary-content transition hover:bg-primary-focus flex-none">
        Search
      </button>
    </form>
  );
};

export default SearchForm;