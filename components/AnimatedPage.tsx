import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px) saturate(0.8)',
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px) saturate(1)',
    scale: 1
  },
  out: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px) saturate(0.8)',
    scale: 0.98
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;