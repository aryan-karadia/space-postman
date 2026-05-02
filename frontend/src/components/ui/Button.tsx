import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'font-display text-sm font-semibold uppercase tracking-wider',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void-black',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-neon-cyan text-void-black',
          'shadow-neon-cyan',
          'hover:bg-neon-cyan/90 hover:shadow-[0_0_15px_#00F0FF,0_0_30px_rgba(0,240,255,0.3)]',
        ],
        secondary: [
          'border border-neon-magenta text-neon-magenta',
          'shadow-neon-magenta',
          'hover:bg-neon-magenta/10 hover:shadow-[0_0_15px_#FF00DE,0_0_30px_rgba(255,0,222,0.3)]',
        ],
        ghost: ['text-star-white', 'hover:bg-space-mid hover:text-neon-cyan'],
        destructive: ['bg-neon-magenta text-void-black', 'hover:bg-neon-magenta/90'],
        outline: [
          'border border-neon-cyan/50 text-neon-cyan bg-transparent',
          'hover:bg-neon-cyan/10 hover:border-neon-cyan',
          'hover:shadow-neon-cyan',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-cyber',
        default: 'h-10 px-6 py-2 rounded-cyber',
        lg: 'h-12 px-8 text-base rounded-cyber',
        icon: 'h-10 w-10 rounded-cyber',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
