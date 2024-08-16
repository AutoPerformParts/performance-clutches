import {FiShoppingCart} from 'react-icons/fi';
import {IconButton} from './iconbutton';

export function CartButton() {
  return (
    <IconButton to="/cart">
      <FiShoppingCart />
    </IconButton>
  );
}
