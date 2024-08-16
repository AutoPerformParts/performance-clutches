import {Await, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Suspense} from 'react';
// import {Image} from '@shopify/hydrogen';

export function FeaturedCollection({
  collections,
}: {
  // collections: FeaturedCollectionsQuery;
  collections: any;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={collections}>
        {(n) => {
          return (
            <>
              {n?.nodes?.map((collection: any) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.handle}`}
                  className="bg-slate-950 text-white block transition-all rounded-md overflow-hidden drop-shadow-xl hover:underline underline-offset-2 hover:text-secondary-400"
                >
                  <h2 className=" p-3 text-right font-titles uppercase font-bold ">
                    {collection.title}
                  </h2>
                  <Image
                    data={collection.image}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                    className="hover:scale-105 transition-all ease-in-out overflow-hidden duration-200"
                  />
                  <p className="p-3 bg-slate-950 text-small text-white font-titles uppercase font-bold ">
                    Shop Now
                  </p>
                </Link>
              ))}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}
//<Image data={image} sizes="100vw" />
/*
  if (!collection) return null;
  const image = collection?.image;
  return (
    <div className="bg-slate-100 dark:bg-slate-700 col-span-2 rounded">
      <Link
        className="featured-collection"
        to={`/collections/${collection.handle}`}
      >
        {image && <div style={{width: '100%'}}></div>}
        <h1>{collection.title}</h1>
      </Link>
    </div>
  );
  */
