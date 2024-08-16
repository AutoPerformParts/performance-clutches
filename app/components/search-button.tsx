import {FaSistrix} from 'react-icons/fa6';
import {IconButton} from './iconbutton';

export function SearchButton() {
  return (
    <div className="md:hidden">
      <IconButton to="/clutch-selector">
        <FaSistrix />
      </IconButton>
    </div>
  );
}
