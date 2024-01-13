import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'danger';
};

export function Button({ children, className, variant, ...props }: ButtonProps) {
  let color = '[&:before]:bg-gradient-to-b [&:before]:from-blue-500 [&:before]:to-blue-800';
  if (variant === 'danger') {
    color = '[&:before]:bg-gradient-to-b [&:before]:from-red-500 [&:before]:to-red-800';
  }

  return (
    <button
      className={twMerge(
        classNames(
          'btn-58 pointer-events-auto relative z-20 w-1/2 max-w-[360px] select-none py-8 pl-8 pr-5 font-bold',
          color,
          className || '',
        ),
      )}
      {...props}
    >
      {children}
    </button>
  );
}
