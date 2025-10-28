import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

const NotFound: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-5">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="text-3xl mt-4 font-semibold">Page Not Found</p>
        <p className="text-on-surface-variant mt-2">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-8 inline-flex items-center capitalize justify-center px-6 py-4 font-medium rounded-full focus:outline-none bg-primary text-on-primary transition hover:opacity-90">
          Go Home
        </Link>
      </div>
    </AnimatedPage>
  );
};

export default NotFound;