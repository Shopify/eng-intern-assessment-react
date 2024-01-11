import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '~/utilities/merge';

export default function Button({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn('py-1.5 px-5 rounded-md w-[80px]', className)}>
      {children}
    </button>
  );
}
