import {Await, Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {Suspense} from 'react';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';

export function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={products}>
        {({products}) => (
          <>
            {products.nodes.map((product) => (
              <div key={product.id}>
                <Link
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              </div>
            ))}
          </>
        )}
      </Await>
    </Suspense>
  );
}
