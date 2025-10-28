import React from 'react';
import { Link } from 'react-router-dom';
import AnimeGrid from '../components/AnimeGrid';
import SectionHeader from '../components/SectionHeader';
import AnimatedPage from '../components/AnimatedPage';
import SearchForm from '../components/SearchForm';
import { useApiAuto } from '../hooks/useApi';
import { getHomeData, getGenres, getSchedule } from '../services/apiService';

const Home: React.FC = () => {
  const { data: homeData, loading: homeLoading } = useApiAuto(getHomeData);
  const { data: genres, loading: genresLoading } = useApiAuto(getGenres);
  const { data: schedule, loading: scheduleLoading } = useApiAuto(getSchedule);

  const getTodaysSchedule = () => {
    if (!schedule) return null;
    const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
    const dayIndex = new Date().getDay();
    const today = days[dayIndex];
    return schedule.find(s => s.day.toLowerCase() === today);
  };

  const todaysReleases = getTodaysSchedule();

  return (
    <AnimatedPage>
      <div className="space-y-24 py-10">
        <section className="relative px-5 text-center flex flex-col items-center min-h-[50vh] justify-center overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[400px] -z-10 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[800px] aspect-square -z-10">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/30 dark:bg-secondary/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 text-on-background">
                Your Portal to
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Endless Anime.
                </span>
            </h1>
          <p className="text-lg text-on-surface-variant mt-4 max-w-2xl">
            Discover, track, and stream your favorite series. Your next great adventure is just a search away.
          </p>
          <div className="mt-8 w-full max-w-xl">
            <SearchForm size="large" />
          </div>
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

        {todaysReleases && todaysReleases.animeList.length > 0 && (
           <section className="space-y-8">
                <SectionHeader title="Releasing Today" viewAllLink="/schedule" />
                 <div className="relative">
                    <div className="overflow-x-auto pb-6 pl-5 no-scrollbar">
                        <div className="inline-grid grid-flow-col auto-cols-max md:auto-cols-min md:grid-flow-row md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {todaysReleases.animeList.map(anime => (
                            <Link key={anime.slug} to={`/anime/${anime.slug}`} className="block p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group">
                                <span className="font-semibold text-on-surface group-hover:text-primary transition-colors">{anime.title}</span>
                            </Link>
                        ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden"></div>
                    <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden"></div>
                </div>
           </section>
        )}

        <section className="space-y-8">
          <SectionHeader title="Ongoing Anime" viewAllLink="/ongoing" />
          <div className="px-5">
            <AnimeGrid animes={homeData?.ongoing_anime.slice(0, 12) ?? null} loading={homeLoading} skeletonCount={12} />
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader title="Completed Anime" viewAllLink="/completed" />
          <div className="px-5">
            <AnimeGrid animes={homeData?.complete_anime.slice(0, 12) ?? null} loading={homeLoading} skeletonCount={12} />
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default Home;