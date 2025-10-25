
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Pagination as PaginationType } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface PaginationProps {
  pagination: PaginationType;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, basePath }) => {
  const { page: pageParam } = useParams<{ page?: string }>();
  const currentPage = parseInt(pageParam || '1', 10);
  
  if (!pagination || pagination.last_visible_page <= 1) {
    return null;
  }

  const pages = Array.from({ length: pagination.last_visible_page }, (_, i) => i + 1);

  return (
    <ul className="flex flex-row items-center justify-center gap-3 w-full">
      {pagination.has_previous_page && (
        <li>
          <Link to={`${basePath}/${pagination.previous_page}`} className="inline-flex items-center capitalize justify-center px-3 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary">
            <ChevronLeftIcon />
          </Link>
        </li>
      )}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-3 items-center">
            {pages.map(page => (
                <li key={page}>
                    <Link 
                        to={`${basePath}/${page}`} 
                        className={`inline-flex items-center capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none transition ${
                            currentPage === page 
                            ? 'bg-primary text-primary-content hover:bg-primary-focus' 
                            : 'bg-surface text-text hover:text-primary'
                        }`}
                    >
                        {page}
                    </Link>
                </li>
            ))}
        </div>
      </div>
      {pagination.has_next_page && (
        <li>
          <Link to={`${basePath}/${pagination.next_page}`} className="inline-flex items-center capitalize justify-center px-3 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary">
            <ChevronRightIcon />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
