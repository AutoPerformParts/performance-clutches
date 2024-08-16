import {useContext, useState} from 'react';
// import {Hits, InstantSearch, SearchBox} from 'react-instantsearch';
import {Link} from '@remix-run/react';
import {Configure, Hits, InstantSearch, SearchBox} from 'react-instantsearch';
import {SearchDialog} from './search-dialog';
import {SearchContext} from './search-provider';

export function SearchBar() {
  const searchClient = useContext(SearchContext);
  const [show, setShow] = useState(false);

  if (!searchClient) return <>Loading</>;

  function Hit({hit}: any) {
    return (
      <Link
        to={`/products/${hit.handle}`}
        className="block p-2 hover:bg-slate-100 flex gap-2 rounded transition-all"
        onClick={() => {
          setShow(false);
        }}
      >
        <img src={hit.imageURL} className="w-10" alt="" />
        {hit.title}
      </Link>
    );
  }

  return (
    <SearchDialog setShow={setShow} show={show}>
      <InstantSearch
        future={{
          preserveSharedStateOnUnmount: true,
        }}
        searchClient={searchClient}
        indexName="products"
      >
        <SearchBox
          placeholder="Search..."
          autoFocus
          classNames={{
            root: '',
            form: ' flex',
            input: ' grow',
            submitIcon: 'hidden',
            resetIcon: 'hidden',
          }}
        />
        <Configure hitsPerPage={8} />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </SearchDialog>
  );
  // return (

  // );
  // return (
  //   <form action="#" method="GET" className="hidden md:block md:pl-2">
  //     <label htmlFor="topbar-search" className="sr-only">
  //       Search
  //     </label>
  //     <div className="relative md:w-72 lg:w-96">
  //       <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
  //         <svg
  //           className="w-5 h-5 text-gray-500 dark:text-gray-400"
  //           fill="currentColor"
  //           viewBox="0 0 20 20"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             fillRule="evenodd"
  //             clipRule="evenodd"
  //             d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
  //           ></path>
  //         </svg>
  //       </div>
  //       <input
  //         type="text"
  //         name="email"
  //         id="topbar-search"
  //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  //         placeholder="Search"
  //       />
  //     </div>
  //   </form>
  // );
}
