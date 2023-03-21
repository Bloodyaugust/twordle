import React, { MouseEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button className="w-fit rounded-sm p-2 dark:bg-slate-600 dark:hover:bg-slate-500" onClick={onClick}>
      {children}
    </button>
  );
}
