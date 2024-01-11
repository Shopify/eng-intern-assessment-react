import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '~/utilities/merge';

export default function Button({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn('py-2 px-4 rounded', className)}>
      {children}
    </button>
  );
}
