import clsx from 'clsx';
import {ReactNode} from 'react';

export function CarSelectorContainer({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) {
  return (
    <div
      className={clsx([
        open ? 'rounded-lg shadow-md' : 'rounded-2xl shadow-2xl my-10',
        'border backdrop-blur-xl transition-all ease-in-out duration-700 dark:bg-slate-700 dark:border-slate-800 mx-auto text-white my-3 min-h-72',
      ])}
      style={{
        maxWidth: open ? 2000 : 2000,
        // minHeight: open ? 60 : 150,
        background: 'rgba(0,0,0,0.68)',
      }}
    >
      {children}
    </div>
  );
}
