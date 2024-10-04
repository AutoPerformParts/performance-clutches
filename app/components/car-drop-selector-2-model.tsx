import {useContext, useEffect, useState} from 'react';
import {Configure, Hits, InstantSearch} from 'react-instantsearch';
import {Vehicle, VehicleContext} from './VehicleProvider';
import {SearchContext} from './search-provider';
import DropDownSelector from './DropDownSelector';
import {list} from 'postcss';

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
  const transformItems = (items: any[], {results}: any) => {
    return items
      .map((item, index) => ({
        model: item.model,
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.model === item.model),
      )
      .sort((a, b) => {
        // Check if both are numbers, compare them numerically
        const numA = parseInt(a.model, 10);
        const numB = parseInt(b.model, 10);

        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }

        // Otherwise, compare as strings
        return a.model.localeCompare(b.model, undefined, {numeric: true});
      });
  };

  return (
    <DropDownSelector
      step={2}
      value={model}
      isOpen={isOpen}
      title="Select a Model"
      onChange={handleOpenChange}
      placeHolder="A3 Sportback"
    >
      <>
        {searchClient && (
          <InstantSearch
            searchClient={searchClient}
            indexName="vehicles"
            future={{
              preserveSharedStateOnUnmount: true,
            }}
          >
            <Configure
              analytics={false}
              filters={`make:'${make}'`}
              hitsPerPage={100}
            />

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

export function Hit({hit, ...props}: any) {
  return (
    <div
      className="hover:bg-white hover:text-black px-5 py-2.5"
      key={hit}
      onClick={() => {
        // refine(item.value);
        props.onClick(hit.model);
      }}
    >
      {hit.model}
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
