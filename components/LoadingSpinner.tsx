import React from 'react';

const LoadingSpinner: React.FC<{ overlay?: boolean }> = ({ overlay = false }) => {
    const spinner = <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>;

    if (overlay) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;