
import React from 'react';
import { useParams } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import { useApiAuto } from '../hooks/useApi';
import { searchAnime } from '../services/apiService';

const Search: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { data: searchResults, loading } = useApiAuto(searchAnime, query || '');

  return (
    <>
      <Header title={`Search: "${query}"`} />
      <section className="p-5">
        <SearchForm initialQuery={query} />
      </section>
      <section className="p-5">
        <AnimeGrid animes={searchResults} loading={loading} />
      </section>
    </>
  );
};

export default Search;