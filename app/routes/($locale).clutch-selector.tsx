import {type MetaFunction} from '@remix-run/react';
import {CarSelector} from '~/components/car-selector';

import {Container} from '~/components/container';
import {ContainerContent} from '~/components/container-content';

export const meta: MetaFunction = () => {
  return [{title: 'Performance Clutch Selector'}];
};

export default function Homepage() {
  return (
    <>
      <div
        className="bg-slate-400 min-h-dvh py-16"
        style={{
          background:
            '#FFF url("https://cdn.shopify.com/s/files/1/0709/3652/7131/files/measure2.jpg?v=1709677061") no-repeat center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <ContainerContent>
            <CarSelector />
          </ContainerContent>
        </Container>
      </div>
    </>
  );
}

/*
<div
  className="p-4 text-center rounded-xl backdrop-blur-xl flex flex-col gap-3 items-center"
  style={{
    background: 'rgba(0,0,0,0.7)',
  }}
>
  <PerformanceClutchLogo white />
  <h1 className="font-bold uppercase font-titles text-white text-lg">
    Thanks for your interest
  </h1>
  <p className="prose text-white">
    We're working on our new website. Please check back soon for our
    Clutch Search Feature.
  </p>
  <p className="prose text-white py-3">
    Thank you for your patience
  </p>
  <p className="prose text-white py-3">
    For queries please call 01926 896993
  </p>
  <p className="prose text-white py-3">
    The Performance Clutch team
  </p>
</div>
*/
