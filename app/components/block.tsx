import {ReactNode} from 'react';

export function Block({children}: {children: ReactNode}) {
  return <div className="bg-slate-100 dark:bg-slate-700">{children}</div>;
}
