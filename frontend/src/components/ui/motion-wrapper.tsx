import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const MotionWrapper = ({ 
  children, 
  className,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  ...props
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;