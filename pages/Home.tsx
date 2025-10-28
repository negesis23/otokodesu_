import React from 'react';
import { Link } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import SectionHeader from '../components/SectionHeader';
import AnimatedPage from '../components/AnimatedPage';
import { useApiAuto } from '../hooks/useApi';
import { getHomeData, getGenres } from '../services/apiService';

const Home: React.FC = () => {
  const { data: homeData, loading: homeLoading } = useApiAuto(getHomeData);
  const { data: genres, loading: genresLoading } = useApiAuto(getGenres);

  return (
    <AnimatedPage>
      <div className="space-y-24 py-10">
        <section className="relative px-5 text-center flex flex-col items-center min-h-[40vh] justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/20 dark:to-background"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                <div className="w-[80vw] h-[50vh] bg-primary/30 dark:bg-primary/50 rounded-full blur-3xl"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-on-background">
                Explore Anime
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Like Never Before.
                </span>
            </h1>
          <p className="text-lg text-on-surface-variant mt-4 max-w-2xl">
            Your Ultimate Hub. Discover ongoing and completed series, search by genre, and find your next favorite show with ease.
          </p>
        </section>

        <section className="space-y-8">
          <SectionHeader title="Genres" />
          <div className="relative">
            <div className="overflow-x-auto pb-6 pl-5 no-scrollbar">
                <div className="inline-flex gap-4 items-center">
                    {genresLoading && Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bg-surface-container animate-pulse w-32 h-14 rounded-full">&nbsp;</div>
                    ))}
                    {genres?.map((genre) => (
                    <Link
                        key={genre.slug}
                        to={`/genre/${genre.slug}`}
                        className="inline-flex items-center capitalize justify-center px-6 py-4 font-medium rounded-full focus:outline-none bg-surface-container text-on-surface-container transition hover:bg-gradient-to-br hover:from-primary-container hover:to-secondary-container/50 hover:text-on-primary-container whitespace-nowrap"
                    >
                        {genre.name}
                    </Link>
                    ))}
                </div>
            </div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
             <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          </div>
        </section>

        <section className="px-5 space-y-8">
          <SectionHeader title="Ongoing Anime" viewAllLink="/ongoing" />
          <AnimeGrid animes={homeData?.ongoing_anime.slice(0, 12) ?? null} loading={homeLoading} skeletonCount={12} />
        </section>

        <section className="px-5 space-y-8">
          <SectionHeader title="Completed Anime" viewAllLink="/completed" />
          <AnimeGrid animes={homeData?.complete_anime.slice(0, 12) ?? null} loading={homeLoading} skeletonCount={12} />
        </section>
      </div>
    </AnimatedPage>
  );
};

export default Home;