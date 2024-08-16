import {ReactNode} from 'react';

export function AppBar({children}: {children: ReactNode}) {
  return (
    <div className="py-3 shadow px-6 md:px-0 z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">{children}</div>
      </div>
    </div>
  );
}
