import {FiUser} from 'react-icons/fi';
import {IconButton} from './iconbutton';

export function AccountButton() {
  return (
    <IconButton to="https://dealers.performclutch.com" title='Dealers Portal'>
      <FiUser />
    </IconButton>
  );
}
