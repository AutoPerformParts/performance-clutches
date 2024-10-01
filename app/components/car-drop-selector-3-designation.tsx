  import {useContext, useEffect, useState} from 'react';
import {Configure, InstantSearch, useMenu} from 'react-instantsearch';
import {Vehicle, VehicleContext} from './VehicleProvider';
import {SearchContext} from './search-provider';
import DropDownSelector from './DropDownSelector';

export function CarDropDownSelectorDesignation({
  onClick,
}: {
  onClick: (key: keyof Vehicle, value: string | null) => void;
}) {
  const searchClient = useContext(SearchContext);
  const {make, model, designation} = useContext(VehicleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filters =
    !!make && !!model
      ? `make:'${make}' AND model:'${model}'`
      : `make:'${make}'`;

  useEffect(() => {
    setIsOpen(false);
  }, [make, model]);

  const handleOpenChange = () => {
    if (make && model) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (value: string) => {
    onClick('designation', value);
    setIsOpen(false);
  };

  return (
    <DropDownSelector
      step={3}
      value={designation}
      isOpen={isOpen}
      title='Select an Option'
      onChange={handleOpenChange}
      placeHolder='1.4 TSi'
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
            <Configure analytics={false} filters={filters} hitsPerPage={40} />
            <MenuSelect attribute="designation" onClick={handleSelect} />
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
