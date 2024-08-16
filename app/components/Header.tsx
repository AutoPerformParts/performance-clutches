import clsx from 'clsx';

import {CartButton} from '~/components/cart-button';
import {PerformanceClutchLogo} from '~/components/performance-clutch-logo';
import {SearchBar} from '~/components/search-bar';
import {SearchButton} from '~/components/search-button';
import {AccountButton} from './account-button';
// import {CountrySelectorButton} from './country-selector-button';
import {MicroBar} from './micro-bar';
import {PerformanceClutchIcon} from './performance-clutch-icon';
import {Spacer} from './spacer';

//{header, isLoggedIn, cart}: HeaderProps
//<CountrySelectorButton />
export function HeaderMenu({fullWidth}: {fullWidth?: boolean}) {
  return (
    <>
      <nav className="bg-white dark:bg-gray-800 fixed left-0 right-0 top-0 z-50 shadow-md">
        <MicroBar fullWidth={fullWidth}>
          <Spacer />
          <a
            href="tel:+441926896993"
            className="prose prose-sm text-slate-200 mx-2"
          >
            Call Us +441926 896993
          </a>
        </MicroBar>

        <div
          className={clsx([
            fullWidth && 'container mx-auto',
            'flex flex-wrap justify-between items-center py-3 px-4',
          ])}
        >
          <div
            className={clsx([
              !fullWidth ? 'px-3' : '',
              'justify-start items-center gap-6 flex grow',
            ])}
          >
            <div className="hidden md:block">
              <PerformanceClutchLogo />
            </div>
            <div className="md:hidden">
              <PerformanceClutchIcon />
            </div>

            <SearchBar />
          </div>

          <div
            className={clsx([
              !fullWidth ? 'px-3' : '',
              'flex items-center lg:order-2 gap-1',
            ])}
          >
            <SearchButton />
            <CartButton />
            <AccountButton />
          </div>
        </div>
      </nav>
      <div style={{height: 118}} className="bg-slate-100" />
    </>
  );
}

// import {Await, NavLink} from '@remix-run/react';
// import {Suspense} from 'react';
// import type {HeaderQuery} from 'storefrontapi.generated';
// import {useRootLoaderData} from '~/root';
// import type {LayoutProps} from './Layout';

// type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

// type Viewport = 'desktop' | 'mobile';

// export function Header({header, isLoggedIn, cart}: HeaderProps) {
//   const {shop, menu} = header;
//   return (
//     <header className="header">
//       <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
//         <strong>{shop.name}</strong>
//       </NavLink>
//       <HeaderMenu
//         menu={menu}
//         viewport="desktop"
//         primaryDomainUrl={header.shop.primaryDomain.url}
//       />
//       <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
//     </header>
//   );
// }

// export function HeaderMenu({
//   menu,
//   primaryDomainUrl,
//   viewport,
// }: {
//   menu: HeaderProps['header']['menu'];
//   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
//   viewport: Viewport;
// }) {
//   const {publicStoreDomain} = useRootLoaderData();
//   const className = `header-menu-${viewport}`;

//   function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
//     if (viewport === 'mobile') {
//       event.preventDefault();
//       window.location.href = event.currentTarget.href;
//     }
//   }

//   return (
//     <nav className={className} role="navigation">
//       {viewport === 'mobile' && (
//         <NavLink
//           end
//           onClick={closeAside}
//           prefetch="intent"
//           style={activeLinkStyle}
//           to="/"
//         >
//           Home
//         </NavLink>
//       )}
//       {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
//         if (!item.url) return null;

//         // if the url is internal, we strip the domain
//         const url =
//           item.url.includes('myshopify.com') ||
//           item.url.includes(publicStoreDomain) ||
//           item.url.includes(primaryDomainUrl)
//             ? new URL(item.url).pathname
//             : item.url;
//         return (
//           <NavLink
//             className="header-menu-item"
//             end
//             key={item.id}
//             onClick={closeAside}
//             prefetch="intent"
//             style={activeLinkStyle}
//             to={url}
//           >
//             {item.title}
//           </NavLink>
//         );
//       })}
//     </nav>
//   );
// }

// function HeaderCtas({
//   isLoggedIn,
//   cart,
// }: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
//   return (
//     <nav className="header-ctas" role="navigation">
//       <HeaderMenuMobileToggle />
//       <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
//         <Suspense fallback="Sign in">
//           <Await resolve={isLoggedIn} errorElement="Sign in">
//             {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
//           </Await>
//         </Suspense>
//       </NavLink>
//       <SearchToggle />
//       <CartToggle cart={cart} />
//     </nav>
//   );
// }

// function HeaderMenuMobileToggle() {
//   return (
//     <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
//       <h3>☰</h3>
//     </a>
//   );
// }

// function SearchToggle() {
//   return <a href="#search-aside">Search</a>;
// }

// function CartBadge({count}: {count: number}) {
//   return <a href="#cart-aside">Cart {count}</a>;
// }

// function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
//   return (
//     <Suspense fallback={<CartBadge count={0} />}>
//       <Await resolve={cart}>
//         {(cart) => {
//           if (!cart) return <CartBadge count={0} />;
//           return <CartBadge count={cart.totalQuantity || 0} />;
//         }}
//       </Await>
//     </Suspense>
//   );
// }

// const FALLBACK_HEADER_MENU = {
//   id: 'gid://shopify/Menu/199655587896',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461609500728',
//       resourceId: null,
//       tags: [],
//       title: 'Collections',
//       type: 'HTTP',
//       url: '/collections',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609533496',
//       resourceId: null,
//       tags: [],
//       title: 'Blog',
//       type: 'HTTP',
//       url: '/blogs/journal',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609566264',
//       resourceId: null,
//       tags: [],
//       title: 'Policies',
//       type: 'HTTP',
//       url: '/policies',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609599032',
//       resourceId: 'gid://shopify/Page/92591030328',
//       tags: [],
//       title: 'About',
//       type: 'PAGE',
//       url: '/pages/about',
//       items: [],
//     },
//   ],
// };

// function activeLinkStyle({
//   isActive,
//   isPending,
// }: {
//   isActive: boolean;
//   isPending: boolean;
// }) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'black',
//   };
// }
