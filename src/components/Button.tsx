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
      className="w-fit rounded-sm p-2 disabled:bg-slate-900 disabled:hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500"
      onClick={onClick}>
      {children}
    </button>
  );
}
