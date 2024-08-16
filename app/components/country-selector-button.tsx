import {Link} from '@remix-run/react';
import {Dropdown} from 'flowbite-react';

export function CountrySelectorButton() {
  return (
    <Dropdown label="Small dropdown" size="xs">
      <Dropdown.Item as={Link} to="/en">
        English
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/fr">
        Français
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/de">
        Deutsch
      </Dropdown.Item>
    </Dropdown>
  );
}

/*
<button
  id="dropdownDefaultButton"
  data-dropdown-toggle="dropdown"
  className="text-slate-300 text-primary-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-xs font-medium gap-2"
  type="button"
>
  UK
  <FiChevronDown />
</button> 

<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
<ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
  <li>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
  </li>
  <li>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
  </li>
  <li>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
  </li>
  <li>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
  </li>
</ul>
</div> */
