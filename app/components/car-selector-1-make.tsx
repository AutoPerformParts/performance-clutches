import {ReactNode} from 'react';
import {manufacturers} from '~/util/manufacturers';
import {Vehicle} from './VehicleProvider';

export function CarSelectorMake({
  title,
  onClick,
}: {
  title: ReactNode;
  onClick: (key: keyof Vehicle, value: string | null) => void;
}) {
  return (
    <div className="p-3 lg:p-6">
      <h1 className="font-titles font-bold uppercase text-3xl text-center pb-3">
        {title}
      </h1>
      <p className="p-3 text-md text-center font-titles">
        <span className="pr-2 font-bold">Step 1</span>
        Select a Manufacturer
      </p>
      <div className="grid md:grid-rows-6 md:grid-flow-col">
        {manufacturers.map((m) => (
          <div className="min-w-full" key={m.title}>
            <button
              className="hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-full font-titles uppercase font-semibold transition-all ease-in-out text-left"
              onClick={() => {
                onClick('make', m.title);
              }}
            >
              {m.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
