import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.page.title ?? ''}`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return json({page});
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <Container>
      <ContainerContent>
        <header>
          <h1 className="font-titles uppercase text-3xl font-bold py-3">
            {page.title}
          </h1>
        </header>
        <main
          dangerouslySetInnerHTML={{__html: page.body}}
          style={{lineHeight: 1.8}}
        />
      </ContainerContent>
    </Container>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const;
