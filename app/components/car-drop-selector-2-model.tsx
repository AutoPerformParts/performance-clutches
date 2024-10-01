import {useContext, useEffect, useState} from 'react';
import {
  Configure,
  InstantSearch,
  useInstantSearch,
  useMenu,
} from 'react-instantsearch';
import {Vehicle, VehicleContext} from './VehicleProvider';
import {AlgoliaLogo} from './algolia-logo';
import {SearchContext} from './search-provider';
import ChevronIcon from './icons/ChevronIcon';
import {MenuItem} from '@shopify/hydrogen/storefront-api-types';
import DropDownSelector from './DropDownSelector';

export function CarDropDownSelectorModel({
  onClick,
}: {
  onClick: (key: keyof Vehicle, value: string | null) => void;
}) {
  const searchClient = useContext(SearchContext);
  const {make, model} = useContext(VehicleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [make]);

  const handleOpenChange = () => {
    if (make) {
      setIsOpen((prev) => !prev);
    }
  };
  const handleSelect = (value: string) => {
    onClick('model', value);
    setIsOpen(false);
  };

  return (
    <DropDownSelector
      step={2}
      value={model}
      isOpen={isOpen}
      title='Select a Model'
      onChange={handleOpenChange}
    >
      <>
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
            <MenuSelect attribute="model" onClick={handleSelect} />
          </InstantSearch>
        )}
      </>
    </DropDownSelector>
  );
}

export function MenuSelect(props: any) {
  const {items} = useMenu(props);

  return (
    <>
      {items.map((item, index) => (
        <li
          className="hover:bg-white hover:text-black"
          key={index}
          onClick={() => {
            // refine(item.value);
            props.onClick(item.label);
          }}
        >
          {item.label}
        </li>
      ))}
    </>
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
