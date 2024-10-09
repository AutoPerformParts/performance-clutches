import {useContext, useState} from 'react';
import {Vehicle, VehicleContext} from './VehicleProvider';
import ChevronIcon from './icons/ChevronIcon';
import {manufacturers} from '../util/manufacturers';
import DropDownSelector from './DropDownSelector';

interface IProps {
  onClick: (key: keyof Vehicle, value: string | null) => void;
  values: any;
}

export default function CarDropSelectorMake({onClick, values}: IProps) {
  const {make} = useContext(VehicleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = () => setIsOpen((prev) => !prev);
	
  const handleSelect = (value: string) => {
    onClick('make', value);
    setIsOpen(false);
  };
  return (
      <DropDownSelector
        value={make}
        isOpen={isOpen}
        step={1}
        title='Make a selection'
        onChange={handleOpenChange}
        placeHolder='Audi'
      >
        <>
          {manufacturers.map((e, index: number) => (
            <li
              className="hover:bg-white hover:text-black"
              key={index}
              onClick={() => handleSelect(e.title)}
            >
              {e.title}
            </li>
          ))}
        </>
      </DropDownSelector>
  );
}
