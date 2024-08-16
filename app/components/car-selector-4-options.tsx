import {Link} from '@remix-run/react';
import {useContext} from 'react';
import {Configure, Hits, InstantSearch} from 'react-instantsearch';
import {VehicleContext} from './VehicleProvider';
import {AlgoliaLogo} from './algolia-logo';
import {MakeBackButton} from './car-selector-make-back-button';
import {SearchContext} from './search-provider';

function Hit({hit}: any) {
  return (
    <Link
      className="block hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-full font-titles uppercase font-semibold transition-all ease-in-out text-left"
      to={`/vehicles/${hit.handle}`}
    >
      {hit.title}
    </Link>
  );
}

export function CarSelectorOptions({onReset}: {onReset: () => void}) {
  const {make, model, designation} = useContext(VehicleContext);
  const searchClient = useContext(SearchContext);

  const filters =
    !!make && !!model && !!designation
      ? `make:'${make}' AND model:'${model}' AND designation:'${designation}'`
      : `make:'${make}'`;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 lg:p-6">
        <div>
          <MakeBackButton onClick={onReset} label={make || ''} />
          <MakeBackButton onClick={onReset} label={model || ''} />
          <MakeBackButton onClick={onReset} label={designation || ''} />
        </div>
        <div className="col-span-2">
          <p className="p-3 text-md font-titles">
            <span className="pr-2 font-bold text-secondary-400">Step 4</span>
            Select a Vehicle
          </p>

          {searchClient && (
            <InstantSearch
              future={{
                preserveSharedStateOnUnmount: true,
              }}
              searchClient={searchClient}
              indexName="vehicles"
            >
              <Configure analytics={false} filters={filters} hitsPerPage={5} />
              <Hits hitComponent={Hit} />
            </InstantSearch>
          )}
        </div>
      </div>
      <AlgoliaLogo />
    </>
  );
}
