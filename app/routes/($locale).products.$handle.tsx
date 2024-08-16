import {
  Await,
  Link,
  useLoaderData,
  useNavigate,
  type FetcherWithComponents,
  type MetaFunction,
} from '@remix-run/react';
import {
  CartForm,
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  type VariantOption,
} from '@shopify/hydrogen';
import type {
  CartLineInput,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {FaCheckCircle, FaChevronRight} from 'react-icons/fa';
import type {
  ProductFragment,
  ProductVariantFragment,
  ProductVariantsQuery,
} from 'storefrontapi.generated';
import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';
import {getVariantUrl} from '~/lib/variants';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `${data?.product.title ?? ''} - Performance Clutches`}];
};

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

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

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({product, variants});
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductFragment;
  request: Request;
}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

/*
<FaChevronRight className="text-slate-600" />
<Link
  to="/search"
  className="block transition-all hover:bg-slate-200 py-3 px-6 min-w-32 text-center"
>
  Search
</Link>
*/

export default function Product() {
  const {product, variants} = useLoaderData<typeof loader>();
  const {selectedVariant, descriptionHtml} = product;

  return (
    <>
      <ProductBreadcrumb product={product} />
      <Container>
        <ContainerContent>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 py-2">
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="hidden md:block">
                <ProductImage image={selectedVariant?.image} />
              </div>
              <div className="shadow round-md border md:col-span-3 p-3">
                <ProductImage image={selectedVariant?.image} />
                <br />
                <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
                <br />
                <ProductDetail product={product} />
              </div>
            </div>

            <div className="md:col-span-2">
              <ProductMain
                selectedVariant={selectedVariant}
                product={product}
                variants={variants}
              />
              <ProductConfidence />
            </div>
          </div>
        </ContainerContent>
      </Container>
    </>
  );
}

function ProductBreadcrumb({product}: {product: ProductFragment}) {
  const {title} = product;
  return (
    <div className="bg-slate-100 gap-10 items-center text-slate-600 font-sm hidden md:flex">
      <Container>
        <div className="flex gap-4 px-3 items-center">
          <Link
            className="block transition-all hover:bg-slate-200 py-3 px-6 min-w-32 text-center"
            to="/"
          >
            Home
          </Link>
          <FaChevronRight className="text-slate-600" />
          <Link
            to="#"
            className="block transition-all hover:bg-slate-200 py-3 px-6 min-w-32 text-center"
          >
            {product.title}
          </Link>
        </div>
      </Container>
    </div>
  );
}

function ProductImage({image}: {image: ProductVariantFragment['image']}) {
  return (
    <>
      {!!image && (
        <Image
          alt={image?.altText || 'Product Image'}
          aspectRatio="1/1"
          data={image}
          sizes="(min-width: 45em) 50vw, 100vw"
        />
      )}
    </>
  );
}

function ProductMain({
  selectedVariant,
  product,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Promise<ProductVariantsQuery>;
}) {
  const {title, seo, applications} = product;
  const aps: any = JSON.parse(applications?.value || '');
  const ap = Array.isArray(aps) ? aps : [];
  return (
    <div className="p-3 shadow round-md border">
      <h1 className="font-titles uppercase font-bold text-2xl">{title}</h1>
      <p className="pb-4">by {product.vendor}</p>
      <p className="pb-4">For {ap.join('and ')}</p>
      <p className="pb-4">{seo.description}</p>
      <ProductPrice selectedVariant={selectedVariant} />
      <br />
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function ProductPrice({
  selectedVariant,
}: {
  selectedVariant: ProductFragment['selectedVariant'];
}) {
  return (
    <div className="text-2xl">
      {selectedVariant?.compareAtPrice ? (
        <>
          <p>Sale</p>
          <br />
          <div>
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <s>
              <Money data={selectedVariant.compareAtPrice} />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </div>
  );
}

function ProductConfidence() {
  return (
    <div className="px-3 py-6">
      <strong>Shop with confidence</strong> - we've been serving the automotive
      communities since 2023.
      <ul className="list-disc p-2">
        <li>Warranty platform</li>
        <li>Worldwide shipping via mail or courier</li>
        <li>Secure website and payments</li>
      </ul>
    </div>
  );
}

function InStock() {
  return (
    <div className="flex items-center gap-3 text-xl">
      <FaCheckCircle className="text-lime-600" />
      <strong className="text-lime-600">In Stock</strong> - and ready to ship!
    </div>
  );
}

function ShipsInDays() {
  return (
    <div className="flex items-center gap-3 text-xl">
      <FaCheckCircle className="text-lime-600" />
      <strong className="text-lime-600">In Stock</strong> - Ships in 5 working
      days
    </div>
  );
}

function ProductForm({
  product,
  selectedVariant,
  variants,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Array<ProductVariantFragment>;
}) {
  const navigate = useNavigate();
  return (
    <div className="product-form">
      {selectedVariant?.availableForSale && (
        <div>
          {selectedVariant?.currentlyNotInStock ? <ShipsInDays /> : <InStock />}
        </div>
      )}
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <br />
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          navigate('/cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

function ProductOptions({option}: {option: VariantOption}) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              className="product-options-item"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid black' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
              }}
            >
              {value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: CartLineInput[];
  onClick?: () => void;
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 disabled:bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-large font-bold rounded-lg text-sm px-5 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full uppercase font-titles "
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}

function ProductDetail({product}: {product: ProductFragment}) {
  const {
    height,
    depth,
    use_cases,
    width,
    diameter,
    clamp_load,
    hub_spline,
    step_height,
    interface_type,
    friction_type,
    torque_at_wheels,
  } = product;

  function getData() {
    try {
      const h: any = JSON.parse(height?.value || '');
      const w: any = JSON.parse(width?.value || '');
      const d: any = JSON.parse(depth?.value || '');
      const u: any = JSON.parse(use_cases?.value || '[]') || [];
      const di: any = JSON.parse(diameter?.value || '[]') || [];

      const data = [
        {
          key: 'Use Cases',
          value: `${u?.join(', ')}`,
        },
        {
          key: 'Diameter',
          value: <>{di?.value} MM &#8960;</>,
        },
        {
          key: 'Clamp Load',
          value: <>{clamp_load?.value}</>,
        },
        {
          key: 'Height',
          value: `${h?.value} MM`,
        },
        {
          key: 'Width',
          value: `${w?.value} MM`,
        },
        {
          key: 'Depth',
          value: `${d?.value} MM`,
        },
        {
          key: 'Hub Spline',
          value: <>{hub_spline?.value}</>,
        },
        {
          key: 'Step height',
          value: <>{step_height?.value}</>,
        },
        {
          key: 'Interface type',
          value: <>{interface_type?.value}</>,
        },
        {
          key: 'Friction type',
          value: <>{friction_type?.value}</>,
        },
        {
          key: 'Torque at wheels',
          value: <>{torque_at_wheels?.value}</>,
        },
      ];

      return data;
    } catch (e) {
      return [];
    }
  }

  const data = getData();
  if (!data || data.length === 0) {
    return <></>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Attribute
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({key, value}) => (
            <tr
              key={key}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {key}
              </th>
              <td className="px-6 py-4">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
    applications:metafield(namespace:"custom", key:"applications"){
      value
    }
    use_cases:metafield(namespace:"custom", key:"use_cases"){
      value
    }
    height:metafield(namespace:"custom", key:"height"){
      value
    }
    depth:metafield(namespace:"custom", key:"depth"){
      value
    }
    width:metafield(namespace:"custom", key:"width"){
      value
    }
    diameter:metafield(namespace:"custom", key:"diameter"){
      value
    }
    clamp_load:metafield(namespace:"custom", key:"clamp_load"){
      value
    }
    hub_spline:metafield(namespace:"custom", key:"hub_spline"){
      value
    }
    step_height:metafield(namespace:"custom", key:"step_height"){
      value
    }
    interface_type:metafield(namespace:"custom", key:"interface_type"){
      value
    }
    friction_type:metafield(namespace:"custom", key:"friction_type"){
      value
    }
    torque_at_wheels:metafield(namespace:"custom", key:"torque_at_wheels"){
      value
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

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;

/*
<div
  className="bg-blue-100 p-3"
  style={{
    background:
      '#FFF url("https://cdn.shopify.com/s/files/1/0709/3652/7131/files/road.jpg?v=1709675130") no-repeat center center',
    backgroundSize: 'cover',
  }}
>
  <Container>
    <ContainerContent>
      <CarSuitabilityChecker sku={product.handle.toUpperCase() || ''} />
    </ContainerContent>
  </Container>
</div>
*/
