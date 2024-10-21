import {Await, type MetaFunction} from '@remix-run/react';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {CartMain} from '~/components/Cart';
import {useRootLoaderData} from '~/root';

export const meta: MetaFunction = () => {
  return [{title: `Performance Clutch Cart`}];
};

const actionHandlers = {
  async handleLinesAdd(cart: any, inputs: any): Promise<CartQueryDataReturn> {
    return await cart.addLines(inputs.lines);
  },

  async handleLinesUpdate(cart: any, inputs: any): Promise<CartQueryDataReturn> {
    return await cart.updateLines(inputs.lines);
  },

  async handleLinesRemove(cart: any, inputs: any): Promise<CartQueryDataReturn> {
    return await cart.removeLines(inputs.lineIds);
  },

  async handleDiscountCodesUpdate(cart: any, inputs: any): Promise<CartQueryDataReturn> {
    const formDiscountCode = inputs.discountCode;
    const discountCodes = (formDiscountCode ? [formDiscountCode] : []) as string[];
    discountCodes.push(...inputs.discountCodes);
    return await cart.updateDiscountCodes(discountCodes);
  },

  async handleBuyerIdentityUpdate(
    cart: any,
    inputs: any,
    customerAccessToken: string
  ): Promise<CartQueryDataReturn> {
    return await cart.updateBuyerIdentity({
      ...inputs.buyerIdentity,
      customerAccessToken,
    });
  },
};

export async function action({request, context}: ActionFunctionArgs) {
  try {
    const {cart} = context;

    // Parallel fetch of form data and access token
    const [formData, customerAccessToken] = await Promise.all([
      request.formData(),
      context.customerAccount.getAccessToken(),
    ]);

    const {action, inputs} = CartForm.getFormInput(formData);

    if (!action) {
      throw new Error('No action provided');
    }

    let result: CartQueryDataReturn;

    // Use action handlers map for cleaner code
    switch (action) {
      case CartForm.ACTIONS.LinesAdd:
        result = await actionHandlers.handleLinesAdd(cart, inputs);
        break;
      case CartForm.ACTIONS.LinesUpdate:
        result = await actionHandlers.handleLinesUpdate(cart, inputs);
        break;
      case CartForm.ACTIONS.LinesRemove:
        result = await actionHandlers.handleLinesRemove(cart, inputs);
        break;
      case CartForm.ACTIONS.DiscountCodesUpdate:
        result = await actionHandlers.handleDiscountCodesUpdate(cart, inputs);
        break;
      case CartForm.ACTIONS.BuyerIdentityUpdate:
        result = await actionHandlers.handleBuyerIdentityUpdate(
          cart,
          inputs,
          customerAccessToken as string
        );
        break;
      default:
        throw new Error(`${action} cart action is not defined`);
    }

    const {cart: cartResult, errors} = result;
    const headers = cart.setCartId(cartResult.id);

    // Handle redirect if present
    const redirectTo = formData.get('redirectTo') ?? null;
    const status = typeof redirectTo === 'string' ? 303 : 200;
    
    if (typeof redirectTo === 'string') {
      headers.set('Location', redirectTo);
    }

    // Commit session
    headers.append('Set-Cookie', await context.session.commit());

    return json(
      {
        cart: cartResult,
        errors,
        analytics: {
          cartId: cartResult.id,
        },
      },
      {status, headers},
    );
  } catch (error) {
    console.error('Cart action error:', error);
    return json(
      {
        cart: null,
        errors: ['An unexpected error occurred. Please try again.'],
      },
      {status: 500},
    );
  }
}

export default function Cart() {
  const rootData = useRootLoaderData();
  const cartPromise = rootData.cart;

  return (
    <div className="bg-slate-100 dark:bg-slate-800 py-6 min-h-dvh">
      <div className="container mx-auto ">
        <h1 className="font-titles uppercase text-4xl font-semibold mb-6">
          Your cart
        </h1>
        <Suspense fallback={<p>Loading cart ...</p>}>
          <Await
            resolve={cartPromise}
            errorElement={<div>An error occurred</div>}
          >
            {(cart) => {
              return <CartMain layout="page" cart={cart} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
