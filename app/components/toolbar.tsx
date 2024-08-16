import {ReactNode} from 'react';

export function Toolbar({children}: {children: ReactNode}) {
  return <div className="flex gap-2 items-center	">{children}</div>;
}
