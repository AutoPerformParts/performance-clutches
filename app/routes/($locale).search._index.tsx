//import {getPaginationVariables} from '@shopify/hydrogen';
//import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {MetaFunction} from '@shopify/remix-oxygen';
// import {Frame} from '~/lab/lab';

export const meta: MetaFunction = () => {
  return [{title: 'Search Performance Clutches'}];
};

// export async function loader({context, request}: LoaderFunctionArgs) {
//   const paginationVariables = getPaginationVariables(request, {
//     pageBy: 4,
//   });

//   const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
//     variables: paginationVariables,
//   });

//   return json({collections});
// }

export default function ProductSearch() {
  // const {collections} = useLoaderData<typeof loader>();
  // return <Frame />;
}
