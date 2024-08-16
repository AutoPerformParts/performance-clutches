import {ReactNode} from 'react';

export function Container({children}: {children: ReactNode}) {
  return <div className="container xl mx-auto">{children}</div>;
}
