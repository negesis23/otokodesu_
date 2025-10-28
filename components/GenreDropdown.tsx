import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApiAuto } from '../hooks/useApi';
import { getGenres } from '../services/apiService';
import ChevronDownIcon from './icons/ChevronDownIcon';

const GenreDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: genres, loading } = useApiAuto(getGenres);

    return (
        <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="font-medium transition-colors relative px-4 py-2 rounded-full text-sm text-on-surface-variant hover:text-on-surface flex items-center gap-1">
                <span>Genres</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 bg-surface-container-high rounded-xl shadow-lg p-2 border border-outline-variant/30"
                    >
                        {loading ? (
                            <div className="p-2 text-center text-on-surface-variant">Loading...</div>
                        ) : (
                            <div className="grid grid-cols-2 gap-1 max-h-96 overflow-y-auto no-scrollbar">
                                {genres?.map(genre => (
                                    <Link
                                        key={genre.slug}
                                        to={`/genre/${genre.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 text-sm rounded-md text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container capitalize"
                                    >
                                        {genre.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GenreDropdown;
