import {Button} from '@mui/base';
import {useState} from 'react';
import {FiMoon, FiSun} from 'react-icons/fi';

export function DarkModeToggle() {
  const [usesDarkMode, setDarkMode] = useState(false);

  // Change the icons inside the button based on previous settings
  // useEffect(() => {
  //   if (
  //     localStorage.getItem('color-theme') === 'dark' ||
  //     (!('color-theme' in localStorage) &&
  //       window.matchMedia('(prefers-color-scheme: dark)').matches)
  //   ) {
  //     setDarkMode(true);
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     setDarkMode(false);
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, []);

  return (
    <Button
      className="p-1 rounded-full"
      onClick={() => {
        if (!usesDarkMode) {
          setDarkMode(true);
          document.documentElement.classList.add('dark');
          localStorage?.setItem('color-theme', 'dark');
        } else {
          setDarkMode(false);
          document.documentElement.classList.remove('dark');
          localStorage?.setItem('color-theme', 'light');
        }
      }}
    >
      {usesDarkMode ? <FiSun color="white" /> : <FiMoon color="white" />}
    </Button>
    // // if set via local storage previously
    // if (localStorage.getItem('color-theme')) {
    //     if (localStorage.getItem('color-theme') === 'light') {
    //         document.documentElement.classList.add('dark');
    //         localStorage.setItem('color-theme', 'dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //         localStorage.setItem('color-theme', 'light');
    //     }

    // // if NOT set via local storage previously
    // } else {
    //     if (document.documentElement.classList.contains('dark')) {
    //         document.documentElement.classList.remove('dark');
    //         localStorage.setItem('color-theme', 'light');
    //     } else {
    //         document.documentElement.classList.add('dark');
    //         localStorage.setItem('color-theme', 'dark');
    //     }
    // }
  );
}
