import {Link} from '@remix-run/react';
import usePrefersColorScheme from '~/hooks/usePrefersDarkMode';

export function PerformanceClutchLogo({white}: {white?: boolean}) {
  const prefersColorScheme = usePrefersColorScheme();
  const isDarkMode = prefersColorScheme === 'dark' || white;

  return (
    <Link to="/">
      <img
        src="/performance-clutch-logo.svg"
        alt="Performance Clutch Logo"
        style={{height: 55}}
      />
    </Link>
  );
}

/*
import {Link} from '@remix-run/react';
import usePrefersColorScheme from '~/hooks/usePrefersDarkMode';

export function PerformanceClutchLogo({white}: {white?: boolean}) {
  const prefersColorScheme = usePrefersColorScheme();
  const isDarkMode = prefersColorScheme === 'dark' || white;

  return (
    <Link to="/">
      <img
        src={
          isDarkMode
            ? '/performance-clutch-logo-white.svg'
            : '/performance-clutch-logo.svg'
        }
        alt="Performance Clutch Logo"
        style={{height: 55}}
      />
    </Link>
  );
}

*/
