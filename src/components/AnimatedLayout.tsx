import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition: any = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={`min-h-screen pt-20 pb-12 ${className}`}
    >
      {children}
    </motion.div>
  );
};
