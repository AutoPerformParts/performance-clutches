import clsx from 'clsx';
import {ReactNode} from 'react';

export function Spacer({
  children,
  justify,
}: {
  children?: ReactNode;
  justify?: 'justify-start' | 'justify-center' | 'justify-end';
}) {
  return (
    <div className={clsx(['grow', 'flex', 'align-center', 'gap-2', justify])}>
      {children}
    </div>
  );
}
