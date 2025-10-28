import React from 'react';
import { useParams } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import SectionHeader from '../components/SectionHeader';
import Pagination from '../components/Pagination';
import AnimatedPage from '../components/AnimatedPage';
import { useApiAuto } from '../hooks/useApi';
import { getAnimeByGenre } from '../services/apiService';

const Genre: React.FC = () => {
  const { slug, page } = useParams<{ slug: string, page?: string }>();
  const currentPage = page ? parseInt(page, 10) : 1;
  const { data, loading } = useApiAuto(getAnimeByGenre, slug || '', currentPage);

  const genreName = slug?.replace(/-/g, ' ') || 'Genre';

  return (
    <AnimatedPage>
      <section className="flex flex-col p-5 gap-12">
        <SectionHeader title={genreName} />
        <AnimeGrid animes={data?.anime ?? null} loading={loading} skeletonCount={24} />
        {data?.pagination && <Pagination pagination={data.pagination} basePath={`/genre/${slug}`} />}
      </section>
    </AnimatedPage>
  );
};

export default Genre;