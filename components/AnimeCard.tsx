
import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from './icons/StarIcon';

interface AnimeCardProps {
  slug: string;
  title: string;
  poster: string;
  episode?: string;
  rating?: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ slug, title, poster, episode, rating }) => {
  return (
    <Link to={`/anime/${slug}`} className="group">
      <div className="flex flex-col gap-3">
        <div className="relative w-full bg-surface rounded-3xl overflow-hidden aspect-9/12 border-2 border-transparent transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
          <img src={poster} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 h-full flex flex-col justify-between p-3">
            {episode && <div className="bg-surface/80 backdrop-blur-sm text-text text-sm font-medium px-4 py-2 rounded-full">{episode}</div>}
            {rating && (
              <div className="bg-surface/80 backdrop-blur-sm text-text text-sm font-medium px-4 py-2 rounded-full w-max flex items-center gap-1.5 mt-auto">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                {rating}
              </div>
            )}
          </div>
        </div>
        <h3 className="font-semibold text-text w-full line-clamp-2 transition group-hover:text-primary">{title}</h3>
      </div>
    </Link>
  );
};

export default AnimeCard;