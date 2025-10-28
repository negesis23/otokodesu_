import React from 'react';
import { useParams } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import SectionHeader from '../components/SectionHeader';
import Pagination from '../components/Pagination';
import AnimatedPage from '../components/AnimatedPage';
import { useApiAuto } from '../hooks/useApi';
import { getCompletedAnime } from '../services/apiService';

const Completed: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const currentPage = page ? parseInt(page, 10) : 1;
  const { data, loading } = useApiAuto(getCompletedAnime, currentPage);

  return (
    <AnimatedPage>
      <section className="flex flex-col p-5 gap-12">
        <SectionHeader title="Completed Anime" />
        <AnimeGrid animes={data?.data ?? null} loading={loading} skeletonCount={24} />
        {data?.pagination && <Pagination pagination={data.pagination} basePath="/completed" />}
      </section>
    </AnimatedPage>
  );
};

export default Completed;