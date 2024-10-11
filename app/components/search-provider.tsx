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

const headers = {
  'X-Algolia-API-Key': ALGOLIA_KEY,
  'X-Algolia-Application-Id': ALGOLIA_ID,
  'Content-Type': 'application/json',
};

export const fetchModels = async (make: string, model?: string) => {
  const url = `https://${ALGOLIA_ID}-dsn.algolia.net/1/indexes/vehicles/query`;
  let data = {
    params: `filters=make:'${make}'&hitsPerPage=999&page=0`,
  };

  const allHits = [];
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse: any = await response.json();
      const totalPages = jsonResponse.nbPages || 1;

      // Fetch all pages
      for (let page = 0; page < totalPages; page++) {
        data.params = `filters=make:'${make}'${
          model ? ` AND model:'${model}'` : ''
        }&hitsPerPage=999&page=${page}`;

        const pageResponse = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });

        if (pageResponse.ok) {
          const pageJson: any = await pageResponse.json();
          const hits = pageJson.hits || [];
          allHits.push(...hits);
        } else {
          console.error(
            `Error: ${pageResponse.status}, ${await pageResponse.text()}`,
          );
          break;
        }
      }
    } else {
      console.error(
        `Error retrieving data for ${make}: ${
          response.status
        }, ${await response.text()}`,
      );
    }
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
  let unique;
  if (!model) {
    unique = [...new Set(allHits.map((hit) => hit.model))];
  } else {
    const activeVehicles = [];
    for (const hit of allHits) {
      const query = hit.objectID?.split('-').at(-1);
      if (!query) {
        continue;
      }
      try {
        const response = await fetchProductCatalogue(query);
        if (response.length) {
          activeVehicles.push(hit);
        }
      } catch (err) {
        await fetch(
          'https://hook.us1.make.com/cv1oe4xn88yi261g0efvvkifhc5rypk4',
          {
            method: 'POST',
            body: JSON.stringify({
              errCode: 'Too much requests',
              errMessage: err,
            }),
          },
        );
      }
    }
    unique = [...new Set(activeVehicles.map((hit) => hit.designation))];
  }
  return unique.sort();
};

export const fetchProductCatalogue = async (query?: string) => {
  if (!query) return;
  try {
    // const query = vehicle.id.split('/').at(-1);
    const response = await fetch(
      `https://${ALGOLIA_ID}-dsn.algolia.net/1/indexes/products?hitsPerPage=10&query=${query}`,
      {
        headers: headers,
      },
    );
    
    if (response.status == 429) {
      throw new Error('Too many request');
    }
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: any = await response.json();
    return data.hits;
  } catch (err) {
    await fetch('https://hook.us1.make.com/cv1oe4xn88yi261g0efvvkifhc5rypk4', {
      method: 'POST',
      body: JSON.stringify({
        errCode: 'Too much requests',
        errMessage: err,
      }),
    });
  }
};
