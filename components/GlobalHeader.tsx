import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SearchForm from './SearchForm';
import GenreDropdown from './GenreDropdown';
import { useScrollDirection } from '../hooks/useScrollDirection';

const GlobalHeader: React.FC = () => {
    const scrollDirection = useScrollDirection();

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `font-medium transition-colors relative px-4 py-2 rounded-full text-sm ${isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`;

    return (
        <motion.header 
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-outline-variant/30"
            variants={{
                hidden: { y: '-100%' },
                visible: { y: '0%' }
            }}
            animate={scrollDirection === 'down' ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
            <div className="container mx-auto max-w-7xl px-5">
                <div className="flex items-center justify-between w-full h-20">
                    <div className="flex items-center gap-10">
                        <Link to="/" className="text-xl md:text-2xl font-bold hover:opacity-80 transition-opacity flex-shrink-0 bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary">
                            Otokodesu
                        </Link>
                        <nav className="hidden lg:flex items-center gap-2">
                            <NavLink to="/ongoing" className={navLinkClasses}>Ongoing</NavLink>
                            <NavLink to="/completed" className={navLinkClasses}>Completed</NavLink>
                            <GenreDropdown />
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
                        <div className="hidden sm:block sm:w-full sm:max-w-xs">
                            <SearchForm />
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default GlobalHeader;