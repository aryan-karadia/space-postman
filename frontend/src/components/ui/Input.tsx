import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-cyber px-4 py-2',
        'bg-space-dark border border-nebula-gray',
        'font-mono text-sm text-star-white placeholder:text-dust-gray',
        'transition-all duration-200',
        'focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan',
        'focus:ring-1 focus:ring-neon-cyan/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
