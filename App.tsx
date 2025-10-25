
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ongoing from './pages/Ongoing';
import Completed from './pages/Completed';
import Search from './pages/Search';
import AnimeDetail from './pages/AnimeDetail';
import Episode from './pages/Episode';
import Genre from './pages/Genre';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ongoing/:page?" element={<Ongoing />} />
          <Route path="/completed/:page?" element={<Completed />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/genre/:slug/:page?" element={<Genre />} />
          <Route path="/anime/:slug" element={<AnimeDetail />} />
          <Route path="/episode/:slug" element={<Episode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
