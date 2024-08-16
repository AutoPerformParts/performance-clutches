import {Link} from '@remix-run/react';
import usePrefersColorScheme from '~/hooks/usePrefersDarkMode';

export function PerformanceClutchIcon() {
  const prefersColorScheme = usePrefersColorScheme();
  const isDarkMode = prefersColorScheme === 'dark';

  return (
    <Link to="/">
      <img
        src={
          isDarkMode
            ? '/performance-clutch-icon.svg'
            : '/performance-clutch-icon.svg'
        }
        alt="Performance Clutch Logo"
        style={{height: 50}}
      />
    </Link>
  );
}
