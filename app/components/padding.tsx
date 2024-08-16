import clsx from 'clsx';
import {ReactNode} from 'react';

export function Padding({
  p,
  py,
  children,
}: {
  py?: number;
  p?: number;
  children: ReactNode;
}) {
  return (
    <div className={clsx([p && `p-${p}`, py && `py-${py}`])}>{children}</div>
  );
}
