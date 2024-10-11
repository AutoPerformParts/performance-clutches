import {Link} from '@remix-run/react';
import {useContext, useEffect, useRef, useState} from 'react';
import {Configure, Hits, InstantSearch} from 'react-instantsearch';
import {
  Vehicle,
  VehicleContext,
  VehicleDispatchContext,
} from './VehicleProvider';
import {fetchProductCatalogue, SearchContext} from './search-provider';

function Hit({hit, onClick}: any) {
  const [show, setShow] = useState(false);
  const childRef = useRef(null);
  useEffect(() => {
    const query = hit.objectID?.split('-').at(-1);
    fetchProductCatalogue(query).then((res) => {
      if (res.length) {
        setShow(true);
      }
    });
  }, []);

  useEffect(() => {
    //@ts-ignore
    const parentElement = childRef.current?.parentNode;
    parentElement.style.display = show ? 'block' : 'none';
  }, [show]);

  return (
    <Link
      ref={childRef}
      className={`hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-full font-titles uppercase font-semibold transition-all ease-in-out text-left`}
      to={`/vehicles/${hit.handle}`}
      // onClick={() => onClick(hit.handle)}
    >
      {hit.title}
    </Link>
  );
}

export function CarDropSelectorOptions({onReset}: {onReset: () => void}) {
  const {make, model, designation} = useContext(VehicleContext);
  const searchClient = useContext(SearchContext);
  const {setState: update} = useContext(VehicleDispatchContext);

  const filters = `make:'${make}' ${model ? `AND model:'${model}'` : ''} ${
    designation ? `AND designation:'${designation}'` : ''
  }`;
  const setState = (id: string) => {
    //@ts-ignore
    update((prev) => {
      return {
        ...prev,
        id: id,
      };
    });
  };
  return (
    <div className="mt-10">
      <p className="text-md font-titles">
        {/* <span className="font-bold text-primary-600">Step 4</span> */}
        Available Vehicles:
      </p>
      <div className="mt-4">
        {searchClient && (
          <InstantSearch
            future={{
              preserveSharedStateOnUnmount: true,
            }}
            searchClient={searchClient}
            indexName="vehicles"
          >
            <Configure analytics={false} filters={filters} hitsPerPage={1000} />
            <Hits
              hitComponent={(props) => <Hit onClick={setState} {...props} />}
              classNames={{
                list: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
              }}
            />
          </InstantSearch>
        )}
      </div>
    </div>
  );
}
