import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#F9B303] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-none';
    
    const variants = {
      primary: 'bg-[#F9B303] text-black hover:bg-[#e0a103]',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-xs tracking-wide uppercase',
      md: 'h-12 px-8 text-sm tracking-widest uppercase',
      lg: 'h-14 px-10 text-base tracking-widest uppercase',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
