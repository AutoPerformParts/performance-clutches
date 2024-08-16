import {Link} from '@remix-run/react';
import clsx from 'clsx';
import {useContext} from 'react';
import {FiChevronRight, FiChevronsDown} from 'react-icons/fi';
import {Vehicle, VehicleContext} from './VehicleProvider';

export function CarSelectorOverview({
  onClick,
  onReset,
}: {
  onReset: () => void;
  onClick: (key: keyof Vehicle, value: string | null) => void;
}) {
  const state = useContext(VehicleContext);

  const btn =
    'flex gap-2 hover:border-white border items-center px-4 py-2 rounded hover:bg-slate-950 uppercase';

  return (
    <div className="p-3 lg:p-6 flex items-center gap-3 font-titles uppercase font-bold">
      <button
        className="uppercase"
        onClick={() => {
          onReset();
        }}
      >
        Your Vehicle
      </button>

      <button
        onClick={() => {
          onReset();
        }}
        className={btn}
      >
        {state.make} <FiChevronsDown />
      </button>

      <button
        className={btn}
        onClick={() => {
          onReset();
        }}
      >
        {state.model} <FiChevronsDown />
      </button>

      <button
        className={btn}
        onClick={() => {
          onReset();
        }}
      >
        {state.id} <FiChevronsDown />
      </button>

      <Link to="/search" className={clsx(btn, 'bg-primary-800')}>
        Search <FiChevronRight />
      </Link>
    </div>
  );
}
