import {Await, useLocation} from '@remix-run/react';
import type {CustomFlowbiteTheme} from 'flowbite-react';
import {Flowbite} from 'flowbite-react';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Footer} from '~/components/Footer';
import {HeaderMenu} from '~/components/Header';
import {VehicleProvider} from './VehicleProvider';
import {SearchProvider} from './search-provider';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
};

export function Layout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
}: LayoutProps) {
  const location = useLocation();

  return (
    <Flowbite theme={{theme: customTheme}}>
      <VehicleProvider>
        <SearchProvider>
          <HeaderMenu fullWidth={!location.pathname.includes('search')} />
          <main className="min-h-dvh">{children}</main>
          <Suspense>
            <Await resolve={footer}>
              {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
            </Await>
          </Suspense>
        </SearchProvider>
      </VehicleProvider>
    </Flowbite>
  );
}

/*
{ && (
  <>
    <MicroBar>
      <Spacer />
      <p className="prose prose-sm text-white mx-2">Call: +440112211</p>
      <CountrySelectorButton />
    </MicroBar>
    <AppBar>
      <PerformanceClutchLogo />
      <Spacer justify="justify-end">
        <SearchButton />
        <CartButton />
      </Spacer>
    </AppBar>
  </>
)}
*/

/*
  <CartAside cart={cart} />
  <SearchAside />
  <MobileMenuAside menu={header?.menu} shop={header?.shop} />
  {header && <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />}


function CartAside({cart}: {cart: LayoutProps['cart']}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}


function MobileMenuAside({
  menu,
  shop,
}: {
  menu: HeaderQuery['menu'];
  shop: HeaderQuery['shop'];
}) {
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id="mobile-menu-aside" heading="MENU">
        <HeaderMenu />
      </Aside>
    )
  );
}
*/
