import React from 'react';
import { useParams } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import AnimatedPage from '../components/AnimatedPage';
import SectionHeader from '../components/SectionHeader';
import { useApiAuto } from '../hooks/useApi';
import { searchAnime } from '../services/apiService';

const Search: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { data: searchResults, loading } = useApiAuto(searchAnime, query || '');

  return (
    <AnimatedPage>
      <section className="p-5">
        <SectionHeader title={`Search Results for: "${query}"`} />
        <div className="mt-12">
          <AnimeGrid animes={searchResults} loading={loading} />
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Search;