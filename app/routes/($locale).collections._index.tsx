import {Link, useLoaderData} from '@remix-run/react';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';
import {SuperTitle} from '~/components/super-title';

export async function loader({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 40,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({collections});
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <Container>
      <ContainerContent>
        <SuperTitle>
          Performance Clutch <span className="text-3xl block">Collections</span>
        </SuperTitle>
        <Pagination connection={collections}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <CollectionsGrid collections={nodes as any} />
            </div>
          )}
        </Pagination>
      </ContainerContent>
    </Container>
  );
}

/*
<NextLink>
  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
</NextLink>
*/

function CollectionsGrid({collections}: {collections: CollectionFragment[]}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {collections.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      key={collection.id}
      className="block shadow hover:shadow-lg p-3"
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection?.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
        />
      )}
      <h5>{collection.title}</h5>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
      sortKey: TITLE
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
