import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function StarRating({
  value,
  onChange,
  size = 16,
  className,
  label,
}: {
  value: number;
  onChange?: (next: number) => void;
  size?: number;
  className?: string;
  label?: string;
}) {
  const rounded = Math.max(0, Math.min(5, value));
  const fullStars = Math.round(rounded);

  return (
    <div className={cn('inline-flex items-center gap-1', className)} aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < fullStars;
        const Comp: any = onChange ? 'button' : 'span';
        return (
          <Comp
            key={i}
            type={onChange ? 'button' : undefined}
            onClick={onChange ? () => onChange(i + 1) : undefined}
            className={cn(
              onChange
                ? 'cursor-pointer p-0 leading-none bg-transparent border-0'
                : '',
            )}
            aria-label={onChange ? `Rate ${i + 1} star${i === 0 ? '' : 's'}` : undefined}
          >
            <Star
              width={size}
              height={size}
              className={cn(isFilled ? 'text-[#F9B303]' : 'text-gray-300')}
              fill={isFilled ? 'currentColor' : 'transparent'}
            />
          </Comp>
        );
      })}
    </div>
  );
}
