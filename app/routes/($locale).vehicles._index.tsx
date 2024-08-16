import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Vehicles`}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const {vehicles} = await storefront.query(VEHICLES_QUERY, {
    variables: {
      first: 10,
    },
  });

  return json({vehicles});
}

export default function Collection() {
  const {vehicles} = useLoaderData<typeof loader>();
  return (
    <Container>
      <ContainerContent>
        {vehicles?.edges?.map((v: any) => (
          <div key={v.node.id}>
            <Link
              className="recommended-product"
              to={`/vehicles/${v.node?.handle}`}
            >
              {v.node?.handle}
            </Link>
          </div>
        ))}
      </ContainerContent>
    </Container>
  );
}

const VEHICLES_QUERY = `#graphql
  query  Vehicles(
    $country: CountryCode
    $first: Int
    $language: LanguageCode
  )@inContext(country: $country, language: $language) {
    vehicles: metaobjects(type:"vehicle", first: $first) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
` as const;
