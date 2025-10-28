import React from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ongoing from './pages/Ongoing';
import Completed from './pages/Completed';
import Search from './pages/Search';
import AnimeDetail from './pages/AnimeDetail';
import Episode from './pages/Episode';
import Genre from './pages/Genre';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/ongoing/:page?" element={<Ongoing />} />
          <Route path="/completed/:page?" element={<Completed />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/genre/:slug/:page?" element={<Genre />} />
          <Route path="/anime/:slug" element={<AnimeDetail />} />
          <Route path="/episode/:slug" element={<Episode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const AppWrapper: React.FC = () => (
    <MemoryRouter>
        <App />
    </MemoryRouter>
);

export default AppWrapper;