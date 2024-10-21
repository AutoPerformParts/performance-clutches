import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {FaCheckCircle} from 'react-icons/fa';
import {useInstantSearch} from 'react-instantsearch';
import {CarSelector} from '~/components/car-selector';
import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';
import {fetchProductCatalogue} from '~/components/search-provider';

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
  const products = await fetchProductCatalogue(vehicle.id.split('/').at(-1));
  const finalProducts = [];
  if (products) {
    for (const element of products) {
      const handle = element.handle;
      const selectedOptions = getSelectedProductOptions(request).filter(
        (option) =>
          // Filter out Shopify predictive search query params
          !option.name.startsWith('_sid') &&
          !option.name.startsWith('_pos') &&
          !option.name.startsWith('_psq') &&
          !option.name.startsWith('_ss') &&
          !option.name.startsWith('_v') &&
          // Filter out third party tracking params
          !option.name.startsWith('fbclid'),
      );

      if (!handle || typeof handle !== 'string' || handle === '') {
        throw new Error('Expected product handle to be defined');
      }

      // await the query for the critical product data
      const {product} = await storefront.query(PRODUCT_QUERY, {
        variables: {handle, selectedOptions},
      });
      finalProducts.push(product);
    }
  }

  return defer({vehicle, handle, products, finalProducts});
}

export default function Vehicle() {
  const {vehicle, finalProducts} = useLoaderData<typeof loader>();

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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {finalProducts &&
                  finalProducts.map((product) => (
                    <Hit
                      hit={{
                        handle: product.handle,
                        imageURL: product?.variants?.nodes?.at(0).image.url,
                        title: product.title,
                        description: product.seo.description,
                        qty: product?.variants?.nodes?.at(0).availableForSale,
                      }}
                    />
                  ))}
              </div>
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
          {hit.qty ? (
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
      <p className="font-titles font-bold uppercase text-4xl text-center">
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

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    currentlyNotInStock
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
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
