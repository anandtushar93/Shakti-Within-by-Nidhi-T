import React from 'react';
import { cn } from '../../utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Container Component
 * Desktop (>=1024px): Occupies ~95% of viewport width up to 1440px max-width, perfectly centered.
 * Tablet & Mobile (<1024px): 100% width with responsive horizontal padding (px-4 to px-8).
 */
const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'w-full lg:w-[95%] max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 container-centered',
        className
      )}
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
