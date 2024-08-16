import {FaPhone} from 'react-icons/fa6';

export function PhoneMobile() {
  return (
    <div className="bg-slate-100 dark:bg-slate-950 block lg:hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-2 rounded">
        <a
          className="flex items-center justify-center gap-2 flex block rounded shadow bg-primary-500 py-2"
          href="tel:+441926 896993"
        >
          <FaPhone className="text-primary-800" /> Call Us
        </a>
      </div>
    </div>
  );
}
