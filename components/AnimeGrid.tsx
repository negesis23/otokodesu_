import React from 'react';
import AnimeCard from './AnimeCard';
import type { AnimeBase, OngoingAnime, CompleteAnime, SearchResult, AnimeByGenre } from '../types';

type AnyAnime = AnimeBase | OngoingAnime | CompleteAnime | SearchResult | AnimeByGenre;

interface AnimeGridProps {
  animes: AnyAnime[] | null;
  loading: boolean;
  skeletonCount?: number;
}

const SkeletonCard: React.FC = () => (
    <div className="flex flex-col gap-3 animate-pulse w-full h-full">
        <div className="bg-surface w-full h-full rounded-3xl aspect-9/12"></div>
        <div className="bg-surface w-full h-5 rounded-lg"></div>
        <div className="bg-surface w-1/2 h-5 rounded-lg"></div>
    </div>
);

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes, loading, skeletonCount = 12 }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        );
    }

    if (!animes || animes.length === 0) {
        return <p className="text-center text-text/70 py-10">No anime found.</p>;
    }

    const getCardProps = (anime: AnyAnime) => {
        const props: { episode?: string; rating?: string } = {};
    
        if ('current_episode' in anime) {
            props.episode = anime.current_episode;
        } else if ('episode_count' in anime && anime.episode_count) {
            props.episode = `${anime.episode_count} Eps`;
        }
    
        if ('rating' in anime && anime.rating) {
            props.rating = anime.rating;
        }
    
        return props;
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {animes.map((anime) => (
                <AnimeCard 
                    key={anime.slug}
                    slug={anime.slug}
                    title={anime.title}
                    poster={anime.poster}
                    {...getCardProps(anime)}
                />
            ))}
        </div>
    );
};

export default AnimeGrid;