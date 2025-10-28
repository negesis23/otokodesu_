import React from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, viewAllLink }) => {
  return (
    <div className="px-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <span className="w-1.5 h-8 bg-gradient-to-br from-primary to-secondary rounded-full"></span>
            <h2 className="text-3xl font-bold capitalize tracking-tight text-on-background">{title}</h2>
        </div>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-primary hover:underline flex items-center gap-1 font-medium text-sm">
            <span>View All</span>
            <ChevronRightIcon className="w-5 h-5"/>
          </Link>
        )}
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent mt-4"></div>
    </div>
  );
};

export default SectionHeader;