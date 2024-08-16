import algoliasearch, {SearchClient} from 'algoliasearch/lite';
import {ReactNode, createContext, useEffect, useState} from 'react';

const ALGOLIA_ID = '36ROEDKP7G';
const ALGOLIA_KEY = '6e672b9f83b83778ccbdb7e358209b87';

export const SearchContext = createContext<SearchClient | null>(null);

export function SearchProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<SearchClient | null>(null);

  useEffect(() => {
    if (!!state) return;
    const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);
    if (!searchClient) return;
    setState(searchClient);
  }, []);

  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  );
}
