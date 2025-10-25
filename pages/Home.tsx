
import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import AnimeGrid from '../components/AnimeGrid';
import { useApiAuto } from '../hooks/useApi';
import { getHomeData, getGenres } from '../services/apiService';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';

const Home: React.FC = () => {
  const { data: homeData, loading: homeLoading } = useApiAuto(getHomeData);
  const { data: genres, loading: genresLoading } = useApiAuto(getGenres);

  return (
    <div className="space-y-16 py-10">
      <section className="px-5 text-center">
        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-focus">Otokodesu</h1>
        <p className="text-lg text-text/70 mb-6">Your Ultimate Anime Hub</p>
        <SearchForm />
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold capitalize px-5">Genres</h2>
        <div className="overflow-x-auto pb-4 pl-5">
          <div className="inline-flex gap-3.5 items-center">
            {genresLoading && Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-surface animate-pulse w-28 h-12 rounded-full">&nbsp;</div>
            ))}
            {genres?.map((genre) => (
              <Link
                key={genre.slug}
                to={`/genre/${genre.slug}`}
                className="inline-flex items-center capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary whitespace-nowrap"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">Ongoing Anime</h2>
          <Link to="/ongoing" className="text-primary hover:underline flex items-center gap-1">
            <span>View All</span>
            <ChevronRightIcon className="w-5 h-5"/>
            </Link>
        </div>
        <AnimeGrid animes={homeData?.ongoing_anime.slice(0, 6) ?? null} loading={homeLoading} skeletonCount={6} />
      </section>

      <section className="px-5 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">Completed Anime</h2>
          <Link to="/completed" className="text-primary hover:underline flex items-center gap-1">
            <span>View All</span>
            <ChevronRightIcon className="w-5 h-5"/>
          </Link>
        </div>
        <AnimeGrid animes={homeData?.complete_anime.slice(0, 6) ?? null} loading={homeLoading} skeletonCount={6} />
      </section>
    </div>
  );
};

export default Home;