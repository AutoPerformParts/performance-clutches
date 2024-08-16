import {FiUser} from 'react-icons/fi';
import {IconButton} from './iconbutton';

export function AccountButton() {
  return (
    <IconButton to="/account">
      <FiUser />
    </IconButton>
  );
}
