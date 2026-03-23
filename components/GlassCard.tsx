import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'button';
  [x: string]: any; // Allow other props like 'key'
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick, as = 'div', ...props }) => {
  const baseClasses = "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl transition-all duration-300";
  const hoverClasses = "hover:bg-white/10 hover:border-primary/50";
  
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`;

  const Component = as;

  return (
    <Component className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </Component>
  );
};
