import {ReactNode} from 'react';

export function ContainerContent({children}: {children: ReactNode}) {
  return <div className="p-4">{children}</div>;
}
