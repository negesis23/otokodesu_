import React from 'react';
import { useParams } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import SectionHeader from '../components/SectionHeader';
import Pagination from '../components/Pagination';
import AnimatedPage from '../components/AnimatedPage';
import { useApiAuto } from '../hooks/useApi';
import { getOngoingAnime } from '../services/apiService';

const Ongoing: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const currentPage = page ? parseInt(page, 10) : 1;
  const { data, loading } = useApiAuto(getOngoingAnime, currentPage);

  return (
    <AnimatedPage>
      <section className="flex flex-col p-5 gap-12">
        <SectionHeader title="Ongoing Anime" />
        <AnimeGrid animes={data?.data ?? null} loading={loading} skeletonCount={24} />
        {data?.pagination && <Pagination pagination={data.pagination} basePath="/ongoing" />}
      </section>
    </AnimatedPage>
  );
};

export default Ongoing;