
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-5">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="text-text/70 mt-2">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-8 inline-flex items-center capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-primary text-primary-content transition hover:bg-primary-focus">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
