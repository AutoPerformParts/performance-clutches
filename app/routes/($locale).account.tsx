import {Form, NavLink, Outlet, useLoaderData} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Container} from '~/components/container';
import {Padding} from '~/components/padding';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: LoaderFunctionArgs) {
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  );

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return json(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <Container>
      <Padding py={4}>
        <h1 className="font-titles text-4xl uppercase font-bold">{heading}</h1>

        <AccountMenu />
        <br />
        <br />
        <Outlet context={{customer}} />
      </Padding>
    </Container>
  );
}

function AccountMenu() {
  function isActiveStyle({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return {
      fontWeight: isActive ? 'bold' : undefined,
      color: isPending ? 'grey' : 'black',
    };
  }

  return (
    <nav role="navigation" className="container mx-auto flex gap-4">
      <NavLink to="/account/orders" style={isActiveStyle}>
        Orders
      </NavLink>

      <NavLink to="/account/profile" style={isActiveStyle}>
        Profile
      </NavLink>

      <NavLink to="/account/addresses" style={isActiveStyle}>
        Addresses
      </NavLink>

      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      &nbsp;<button type="submit">Sign out</button>
    </Form>
  );
}
