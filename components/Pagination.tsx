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

  const baseClasses = "relative inline-flex items-center capitalize justify-center font-medium rounded-full focus:outline-none transition-all duration-300";
  const sizeClasses = "w-10 h-10 md:w-12 md:h-12";
  const iconSizeClasses = "w-10 h-10 md:w-12 md:h-12";
  const interactiveClasses = "bg-surface-container text-on-surface-container hover:bg-surface-container-high";
  const activeClasses = "bg-gradient-to-br from-primary to-secondary text-on-primary shadow-lg shadow-primary/20";

  return (
    <ul className="flex flex-row items-center justify-center gap-2 md:gap-3 w-full">
      {pagination.has_previous_page && (
        <li>
          <Link 
            to={`${basePath}/${pagination.previous_page}`} 
            className={`${baseClasses} ${iconSizeClasses} ${interactiveClasses}`}
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon />
          </Link>
        </li>
      )}
      
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={`${DOTS}-${index}`} className="flex items-center justify-center w-10 h-10 text-on-surface-variant">...</li>;
        }

        const isActive = currentPage === pageNumber;

        return (
          <li key={pageNumber}>
              <Link 
                  to={`${basePath}/${pageNumber}`} 
                  className={`${baseClasses} ${sizeClasses} ${isActive ? activeClasses : interactiveClasses}`}
                  aria-current={isActive ? 'page' : undefined}
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
            className={`${baseClasses} ${iconSizeClasses} ${interactiveClasses}`}
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