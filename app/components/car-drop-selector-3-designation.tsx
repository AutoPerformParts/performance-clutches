import {useContext, useEffect, useState} from 'react';
import {Configure, Hits, InstantSearch} from 'react-instantsearch';
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

  const transformItems = (items: any[], {results}: any) => {
    return items
      .map((item, index) => ({
        designation: item.designation,
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.designation === item.designation),
      );
  };

  return (
    <DropDownSelector
      step={3}
      value={designation}
      isOpen={isOpen}
      title="Select an Option"
      onChange={handleOpenChange}
      placeHolder="1.4 TSi"
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
            <Hits
              hitComponent={(props) => (
                <Hit {...props} onClick={handleSelect} />
              )}
              //@ts-ignore
              transformItems={transformItems}
              classNames={{
                list: 'flex flex-col bg-zinc-900  text-white',
              }}
              style={{
                padding: 0,
              }}
            />
          </InstantSearch>
        )}
      </>
    </DropDownSelector>
  );
}

function Hit({hit, ...props}: any) {
  return (
    <div
      className="hover:bg-white hover:text-black px-5 py-2.5"
      key={hit}
      onClick={() => {
        // refine(item.value);
        props.onClick(hit.designation);
      }}
    >
      {hit.designation}
    </div>
  );
}
