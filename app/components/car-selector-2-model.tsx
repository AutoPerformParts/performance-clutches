import {useContext} from 'react';
import {Configure, InstantSearch, useMenu} from 'react-instantsearch';
import {Vehicle, VehicleContext} from './VehicleProvider';
import {AlgoliaLogo} from './algolia-logo';
import {MakeBackButton} from './car-selector-make-back-button';
import {SearchContext} from './search-provider';

export function CarSelectorModel({
  onClick,
  onReset,
}: {
  onReset: () => void;
  onClick: (key: keyof Vehicle, value: string | null) => void;
}) {
  const searchClient = useContext(SearchContext);
  const {make} = useContext(VehicleContext);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-96 p-3 lg:p-6">
        <div>
          <MakeBackButton onClick={onReset} label={make || ''} />
        </div>
        <div className="col-span-2">
          <p className="p-3 text-md font-titles">
            <span className="pr-2 font-bold text-secondary-400">Step 2</span>
            Select a Model
          </p>
          {searchClient && (
            <InstantSearch
              future={{
                preserveSharedStateOnUnmount: true,
              }}
              searchClient={searchClient}
              indexName="vehicles"
            >
              <Configure
                analytics={false}
                filters={`make:'${make}'`}
                hitsPerPage={40}
              />
              <MenuSelect
                attribute="model"
                onClick={(model: string) => {
                  onClick('model', model);
                }}
              />
            </InstantSearch>
          )}
        </div>
      </div>
      <AlgoliaLogo />
    </>
  );
}

export function MenuSelect(props: any) {
  const {items} = useMenu(props);

  return (
    <div className="flex flex-wrap">
      {items.map((item) => (
        <button
          key={item.label}
          className="hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-72 font-titles uppercase font-semibold transition-all ease-in-out text-left"
          onClick={() => {
            // refine(item.value);
            props.onClick(item.label);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* <select
      value={selectedValue}
      onChange={(event) => {
        refine(event.target.value);
      }}
    >
      {items.map((item) => (
        <option value={item.value}>
          {item.label} ({item.count})
        </option>
      ))}
    </select> */
