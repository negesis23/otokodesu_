import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.div 
      whileHover={{ y: -6 }} 
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/anime/${slug}`} className="group">
        <div className="flex flex-col gap-3">
          <div className="relative w-full bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden aspect-9/12 shadow-sm transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(var(--color-primary)/0.25)] group-hover:border-primary/30">
            <img src={poster} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-3 right-3 left-3 flex flex-col items-end">
              {episode && <div className="bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1 rounded-full">{episode}</div>}
              {rating && (
                <div className="bg-surface-container text-on-surface-container text-xs font-semibold px-3 py-1 rounded-full w-max flex items-center gap-1 mt-auto">
                  <StarIcon className="w-3 h-3 text-yellow-400" />
                  {rating}
                </div>
              )}
            </div>
          </div>
          <h3 className="font-semibold text-on-background text-sm w-full line-clamp-2 transition group-hover:text-primary">{title}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;