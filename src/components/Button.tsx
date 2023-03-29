import React, { MouseEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, disabled, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      className="w-fit rounded-sm bg-slate-500 p-2 text-white hover:bg-slate-600 disabled:bg-slate-900 disabled:text-black disabled:hover:bg-slate-900 dark:bg-slate-600 dark:text-black dark:hover:bg-slate-500"
      onClick={onClick}>
      {children}
    </button>
  );
}
