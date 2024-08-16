import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Benefits} from '~/components/benefits';
import {CarSelector} from '~/components/car-selector';
import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';
import {SuperHeroCard} from '~/modules/homepage/super-hero-card';
import {FeaturedCollection} from '../modules/homepage/FeaturedCollection';

export const meta: MetaFunction = () => {
  return [{title: 'Performance Clutches | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections: featuredCollections} = await context.storefront.query(
    FEATURED_COLLECTIONS_QUERY,
  );
  // const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  //recommendedProducts
  return defer({featuredCollections});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Benefits />
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
          <div className="flex flex-col md:grid md:grid-cols-4 gap-2 mb-3">
            <SuperHeroCard />
            <FeaturedCollection collections={data.featuredCollections} />
            <div
              className="col-span-2 bg-slate-900 rounded"
              style={{
                background:
                  '#FFF url("https://cdn.shopify.com/s/files/1/0709/3652/7131/files/engine_bay.jpg?v=1709674816") no-repeat center center',
                backgroundSize: 'cover',
              }}
            >
              h
            </div>
            <div
              className="bg-slate-900 rounded-lg min-h-44"
              style={{
                background:
                  '#FFF url("https://cdn.shopify.com/s/files/1/0709/3652/7131/files/measure2.jpg?v=1709677061") no-repeat center center',
                backgroundSize: 'cover',
              }}
            >
              h
            </div>
          </div>
        </ContainerContent>
      </Container>
    </>
  );
}

const FEATURED_COLLECTIONS_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 10, sortKey: TITLE) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   fragment RecommendedProduct on Product {
//     id
//     title
//     handle
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     images(first: 1) {
//       nodes {
//         id
//         url
//         altText
//         width
//         height
//       }
//     }
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true, query: "PC-1") {
//       nodes {
//         ...RecommendedProduct
//       }
//     }
//   }
// ` as const;
