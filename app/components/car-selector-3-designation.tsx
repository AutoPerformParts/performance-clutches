import {useContext} from 'react';
import {Configure, InstantSearch} from 'react-instantsearch';
import {Vehicle, VehicleContext} from './VehicleProvider';
import {AlgoliaLogo} from './algolia-logo';
import {MenuSelect} from './car-selector-2-model';
import {MakeBackButton} from './car-selector-make-back-button';
import {SearchContext} from './search-provider';

export function CarSelectorDesignation({
  onClick,
  onReset,
}: {
  onReset: () => void;
  onClick: (id: Vehicle['id'], designation: Vehicle['designation']) => void;
}) {
  const {make, model} = useContext(VehicleContext);
  const searchClient = useContext(SearchContext);

  const filters =
    !!make && !!model
      ? `make:'${make}' AND model:'${model}'`
      : `make:'${make}'`;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-h-96 p-3 lg:p-6">
        <div>
          <MakeBackButton onClick={onReset} label={make || ''} />
          <MakeBackButton
            onClick={() => {
              onClick('model', '');
            }}
            label={model || ''}
          />
        </div>
        <div className="col-span-2">
          <p className="p-3 text-md font-titles">
            <span className="pr-2 font-bold text-secondary-400">Step 3</span>
            Select an Option
          </p>
          {searchClient && (
            <InstantSearch
              future={{
                preserveSharedStateOnUnmount: true,
              }}
              searchClient={searchClient}
              indexName="vehicles"
            >
              <Configure analytics={false} filters={filters} hitsPerPage={40} />
              <MenuSelect
                attribute="designation"
                onClick={(model: string) => {
                  onClick('id', model);
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
