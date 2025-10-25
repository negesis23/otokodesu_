import React from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Pagination as PaginationType } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import { usePagination, DOTS } from '../hooks/usePagination';

interface PaginationProps {
  pagination: PaginationType;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, basePath }) => {
  const { page: pageParam } = useParams<{ page?: string }>();
  const currentPage = parseInt(pageParam || '1', 10);
  
  const paginationRange = usePagination({
    currentPage,
    totalPageCount: pagination.last_visible_page,
    siblingCount: 1,
  });

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className="flex flex-row items-center justify-center gap-2 md:gap-3 w-full">
      {pagination.has_previous_page && (
        <li>
          <Link 
            to={`${basePath}/${pagination.previous_page}`} 
            className="inline-flex items-center capitalize justify-center p-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary"
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon />
          </Link>
        </li>
      )}
      
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={`${DOTS}-${index}`} className="flex items-center justify-center w-10 h-10 text-text/50">...</li>;
        }

        return (
          <li key={pageNumber}>
              <Link 
                  to={`${basePath}/${pageNumber}`} 
                  className={`inline-flex items-center capitalize justify-center w-10 h-10 md:w-12 md:h-12 font-medium rounded-full focus:outline-none transition ${
                      currentPage === pageNumber 
                      ? 'bg-primary text-primary-content hover:bg-primary-focus' 
                      : 'bg-surface text-text hover:text-primary'
                  }`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
              >
                  {pageNumber}
              </Link>
          </li>
        );
      })}

      {pagination.has_next_page && (
        <li>
          <Link 
            to={`${basePath}/${pagination.next_page}`} 
            className="inline-flex items-center capitalize justify-center p-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary"
            aria-label="Go to next page"
          >
            <ChevronRightIcon />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;