import { ComponentProps } from 'react';

export function Button({ children, className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className={`btn-58 pointer-events-auto relative z-20 w-1/2 max-w-[360px] select-none font-bold [&:before]:bg-gradient-to-b [&:before]:from-blue-500 [&:before]:to-blue-800 ${
        className || ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
