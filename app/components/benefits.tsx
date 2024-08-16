import {FaLock, FaTruck} from 'react-icons/fa';
import {FaStar, FaSuperpowers} from 'react-icons/fa6';

export function Benefits() {
  return (
    <div className="bg-slate-100 dark:bg-slate-950 hidden lg:block">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-3 rounded">
        <div className="flex items-center justify-center gap-2  flex">
          <FaStar className="text-primary-800" /> Top Notch Support. Call Us
        </div>
        <div className="flex items-center justify-center gap-2  flex">
          <FaTruck className="text-primary-800" /> Fast Delivery in the UK
        </div>
        <div className=" items-center justify-center gap-2  flex">
          <FaSuperpowers className="text-primary-800" />
          No Fuss Warranty Portal
        </div>
        <div className="flex items-center justify-center gap-2">
          <FaLock className="text-green-500" />
          Secure shopping
        </div>
      </div>
    </div>
  );
}
