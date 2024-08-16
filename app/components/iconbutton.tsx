import {Link} from '@remix-run/react';
import {ReactNode} from 'react';

export function IconButton({
  to,
  children,
  onClick,
}: {
  to?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  // Base styles
  const baseClasses =
    'inline-block rounded-full hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 text-lg px-3 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all ease-in-out';

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
/*      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Tooltip content
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>*/
