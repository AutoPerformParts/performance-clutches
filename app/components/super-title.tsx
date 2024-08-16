import {ReactNode} from 'react';

export function SuperTitle({children}: {children: ReactNode}) {
  return (
    <h1 className="font-titles uppercase font-bold text-6xl tracking-tighter">
      {children}
    </h1>
  );
}
