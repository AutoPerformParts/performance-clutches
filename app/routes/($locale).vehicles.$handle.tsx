import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useContext, useEffect} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {
  Configure,
  Hits,
  InstantSearch,
  useInstantSearch,
} from 'react-instantsearch';
import {CarSelector} from '~/components/car-selector';
import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';
import {SearchContext} from '~/components/search-provider';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Vehicles | ${data?.vehicle?.id ?? ''} Collection`}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    return redirect('/vehicles');
  }

  const {vehicle} = await storefront.query(VEHICLE_QUERY, {
    variables: {
      handle,
    },
    // variables: {handle: `gid://shopify/Metaobject/${handle}`},
  });

  if (!vehicle) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({vehicle, handle});
}

export default function Vehicle() {
  const {vehicle, handle} = useLoaderData<typeof loader>();
  const searchClient = useContext(SearchContext);
  // const ctx = useContext(VehicleContext);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if(!ctx.id) {
  //     navigate("/");
  //   }
  // }, [ctx])
  return (
    <>
      <div
        className="bg-blue-100 hidden md:block"
        style={{
          background:
            '#FFF url("https://cdn.shopify.com/s/files/1/0709/3652/7131/files/road.jpg?v=1709675130") no-repeat center center',
          backgroundSize: 'cover',
        }}
      >
        <Container>
          <ContainerContent>
            <CarSelector />
          </ContainerContent>
        </Container>
      </div>

      <Container>
        <ContainerContent>
          <h1 className="font-titles font-bold uppercase text-2xl">
            {vehicle.fields.find((v) => v.key === 'title')?.value}
          </h1>
          <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border p-2">
              <table className="text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  {vehicle.fields
                    .sort((a, b) => a.key.localeCompare(b.key))
                    .map(({key, value}) => (
                      <tr
                        key={key}
                        className=" border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                        >
                          {key.replaceAll('_', ' ')}
                        </th>
                        <td className="p-2">{value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="md:col-span-3">
              {searchClient && (
                <InstantSearch
                  future={{
                    preserveSharedStateOnUnmount: true,
                  }}
                  searchClient={searchClient}
                  indexName="products"
                >
                  <Configure
                    hitsPerPage={10}
                    query={vehicle.id.split('/').at(-1)}
                  />
                  <NoResultsBoundary fallback={<NoResults />}>
                    <Hits
                      hitComponent={Hit}
                      classNames={{
                        list: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
                      }}
                    />
                  </NoResultsBoundary>
                </InstantSearch>
              )}
            </div>
          </div>
        </ContainerContent>
      </Container>
    </>
  );
}

function Hit({hit}: any) {
  return (
    <Link to={`/products/${hit.handle}`}>
      <div className="border-2 border-gray-300 rounded-sm dark:border-gray-600 md:min-h-64 p-6 hover:border-gray-600 ">
        <img src={hit.imageURL} alt={hit.title} className="w-full" />
        <h2 className="font-titles uppercase font-bold">{hit.title}</h2>
        <div className="py-2">
          {hit.qty > 0 ? (
            <strong className="text-lime-600 flex gap-1 items-center">
              <FaCheckCircle className="text-lime-600" /> In Stock
            </strong>
          ) : (
            <strong className="text-red-600">Out of Stock</strong>
          )}
        </div>
        <p>{hit.description}</p>
      </div>
    </Link>
  );
}

function NoResultsBoundary({children, fallback}: any) {
  const {results} = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function NoResults() {
  const {indexUiState} = useInstantSearch();

  return (
    <div>
      <p className='font-titles font-bold uppercase text-4xl text-center'>
        Coming soon...
      </p>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const VEHICLE_QUERY = `#graphql
  query Vehicle(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    vehicle: metaobject(handle: {handle: $handle, type: "vehicle"}) {
      id
      handle
      fields{
        key
        value
      }
    }
  }
` as const;

/*
body_type Hatchback

cylinders 4

designation 1.6 Supercharged

drive FWD

from_month 7

from_year 2004

fuel_type Petrol

horse_power 163

ltr 1.6L

make Mini

model Cooper S

title Mini Cooper S 1.6 Supercharged 2004-2007

to_month 11

to_year 2007
*/
