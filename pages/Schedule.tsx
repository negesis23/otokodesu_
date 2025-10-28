import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import SectionHeader from '../components/SectionHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApiAuto } from '../hooks/useApi';
import { getSchedule } from '../services/apiService';

const Schedule: React.FC = () => {
  const { data: schedule, loading, error } = useApiAuto(getSchedule);

  return (
    <AnimatedPage>
      <section className="flex flex-col p-5 gap-12">
        <SectionHeader title="Release Schedule" />
        {loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        )}
        {error && <p className="text-center py-16 text-on-surface-variant">Error: {error.message}</p>}
        {schedule && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {schedule.map((day) => (
              <div key={day.day} className="bg-surface-container border border-outline-variant/30 rounded-2xl">
                <h3 className="text-xl font-bold p-4 border-b border-outline-variant/30 text-on-surface">{day.day}</h3>
                {day.animeList.length > 0 ? (
                  <ul className="divide-y divide-outline-variant/30 p-2">
                    {day.animeList.map((anime) => (
                      <li key={anime.slug}>
                        <Link to={`/anime/${anime.slug}`} className="block p-3 hover:bg-primary/10 rounded-lg transition-colors group">
                          <span className="font-medium text-on-surface-variant group-hover:text-primary transition-colors">{anime.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-on-surface-variant">No releases scheduled.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </AnimatedPage>
  );
};

export default Schedule;
