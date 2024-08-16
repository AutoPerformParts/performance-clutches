import {useContext} from 'react';
import {FaCheck} from 'react-icons/fa';
import {FiChevronsDown} from 'react-icons/fi';
import {VehicleContext} from './VehicleProvider';

export function CarSelectorSuitability({
  sku,
  onClick,
}: {
  sku: string;
  onClick: () => void;
}) {
  const state = useContext(VehicleContext);
  const hasSelection = !!state.model || !!state.make || !!state.id;

  const btn =
    'flex gap-2 hover:border-white border items-center px-4 py-2 rounded hover:bg-slate-950';
  return (
    <div className="flex gap-4 items-center p-3 lg:p-6 transition-all duration-700 ease-in-out font-titles uppercase font-bold ">
      {hasSelection ? (
        <>
          <div className="m-w-96 flex gap-2">
            <button
              onClick={() => {
                onClick();
              }}
              className="rounded-full bg-secondary-400 p-3 text-secondary-950 flex gap-2 items-center"
            >
              <FaCheck /> Great News!
            </button>
          </div>
          <p className="text-sm">{sku} is recommended for use with</p>
        </>
      ) : (
        <button
          onClick={() => {
            onClick();
          }}
        >
          Suitability Welcome
        </button>
      )}

      <button
        onClick={() => {
          onClick();
        }}
        className={btn}
      >
        {state.make} <FiChevronsDown />
      </button>

      <button
        className={btn}
        onClick={() => {
          onClick();
        }}
      >
        {state.model} <FiChevronsDown />
      </button>
      <button
        className={btn}
        onClick={() => {
          onClick();
        }}
      >
        {state.id} <FiChevronsDown />
      </button>
    </div>
  );
}
