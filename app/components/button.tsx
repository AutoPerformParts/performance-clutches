import {Link} from '@remix-run/react';
import {ReactNode} from 'react';

export function Button({
  children,
  to,
  onClick,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
}) {
  // Base styles
  const baseClasses =
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-full';

  // Return a link
  if (!!to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  // Return a button
  return (
    <button onClick={onClick} type="button" className={baseClasses}>
      {children}
    </button>
  );
}
