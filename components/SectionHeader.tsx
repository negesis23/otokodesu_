import React from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, viewAllLink }) => {
  return (
    <div className="flex justify-between items-baseline px-5 pb-4 border-b border-outline-variant/30">
      <h2 className="text-3xl font-bold capitalize tracking-tight text-on-background">{title}</h2>
      {viewAllLink && (
        <Link to={viewAllLink} className="text-primary hover:underline flex items-center gap-1 font-medium">
          <span>View All</span>
          <ChevronRightIcon className="w-5 h-5"/>
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;