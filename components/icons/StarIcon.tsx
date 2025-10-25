
import React from 'react';

const StarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.681 3.462 3.797.552c.727.106 1.019.993.493 1.503l-2.748 2.68.649 3.782c.124.723-.633 1.28-1.286.944l-3.396-1.785-3.396 1.785c-.653.336-1.41-.221-1.286-.944l.649-3.782L2.34 8.401c-.526-.51-.234-1.397.493-1.503l3.797-.552 1.681-3.462z" clipRule="evenodd" />
    </svg>
);

export default StarIcon;
