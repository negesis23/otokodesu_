import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SearchForm from './SearchForm';
import GenreDropdown from './GenreDropdown';
import { useScrollDirection } from '../hooks/useScrollDirection';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';

const MobileNavLink: React.FC<{ to: string; children: React.ReactNode; onClick: () => void; }> = ({ to, children, onClick }) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `block text-lg font-medium p-4 rounded-lg ${isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`
            }
        >
            {children}
        </NavLink>
    )
}

const Logo = () => (
    <Link to="/" className="transition-opacity hover:opacity-80 flex-shrink-0 flex items-center gap-2.5 text-on-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
         <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C14.7614 22 17 17.5228 17 12C17 6.47715 14.7614 2 12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary">
            Otokodesu
        </span>
    </Link>
);


const GlobalHeader: React.FC = () => {
    const scrollDirection = useScrollDirection();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);
    
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `font-medium transition-colors relative px-4 py-2 rounded-full text-sm ${isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`;

    return (
        <>
            <motion.header 
                className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-outline-variant/30"
                variants={{
                    hidden: { y: '-100%' },
                    visible: { y: '0%' }
                }}
                animate={scrollDirection === 'down' && !isMenuOpen ? 'hidden' : 'visible'}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
                <div className="container mx-auto max-w-7xl px-5">
                    <div className="flex items-center justify-between w-full h-20">
                        <div className="flex items-center gap-10">
                            <Logo />
                            <nav className="hidden lg:flex items-center gap-2">
                                <NavLink to="/ongoing" className={navLinkClasses}>Ongoing</NavLink>
                                <NavLink to="/completed" className={navLinkClasses}>Completed</NavLink>
                                <NavLink to="/schedule" className={navLinkClasses}>Schedule</NavLink>
                                <GenreDropdown />
                            </nav>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
                            <div className="hidden lg:block sm:w-full sm:max-w-xs">
                                <SearchForm />
                            </div>
                            <ThemeToggle />
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-3 font-medium rounded-full bg-surface-container text-on-surface-container transition hover:bg-surface-container-high focus:outline-none"
                                    aria-label="Toggle menu"
                                >
                                    {isMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-lg lg:hidden"
                    >
                        <motion.div 
                            initial={{ y: '-100%' }}
                            animate={{ y: '0%' }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="bg-surface-container-low pt-20 h-full overflow-y-auto"
                        >
                            <div className="container mx-auto max-w-7xl p-5 space-y-6">
                                <SearchForm size="large" />
                                <nav className="flex flex-col gap-2">
                                    <MobileNavLink to="/ongoing" onClick={() => setIsMenuOpen(false)}>Ongoing</MobileNavLink>
                                    <MobileNavLink to="/completed" onClick={() => setIsMenuOpen(false)}>Completed</MobileNavLink>
                                    <MobileNavLink to="/schedule" onClick={() => setIsMenuOpen(false)}>Schedule</MobileNavLink>
                                    <GenreDropdown />
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GlobalHeader;