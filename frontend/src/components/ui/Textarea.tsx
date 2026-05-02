import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[160px] w-full rounded-cyber px-4 py-3',
        'bg-space-dark border border-nebula-gray',
        'font-mono text-sm text-star-white placeholder:text-dust-gray',
        'transition-all duration-200 resize-none',
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
Textarea.displayName = 'Textarea';

export { Textarea };
