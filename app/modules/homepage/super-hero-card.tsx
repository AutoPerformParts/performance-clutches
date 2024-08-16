/*
sx={{
  minHeight: 360,
  background: 'transparent',
  p: 5,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  color: 'white',
}}
*/

import {Link} from '@remix-run/react';
import {FaSearch} from 'react-icons/fa';

export function SuperHeroCard() {
  return (
    <div
      className="md:col-span-2 rounded-md overflow-hidden min-h-72"
      style={{width: '100%', position: 'relative', lineHeight: 0}}
    >
      <video
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <source
          src="https://cdn.shopify.com/videos/c/o/v/c240539b6d4847e68f0a5af4f2a164c6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div style={{position: 'absolute', bottom: 0, right: 0}} className="p-6">
        <h2 className="font-titles uppercase font-bold text-right text-2xl text-white mb-6">
          Find your Performance Clutch
        </h2>
        <Link
          to="/clutch-selector"
          className="flex px-8 py-4 rounded-md bg-blue-800 items-center gap-5 justify-center text-white hover:bg-blue-950 font-titles uppercase font-bold"
        >
          <FaSearch />
          <span className="hidden md:block">Try our Clutch Selector</span>
          <span className="md:hidden">Search</span>
        </Link>
      </div>
    </div>
  );
}
