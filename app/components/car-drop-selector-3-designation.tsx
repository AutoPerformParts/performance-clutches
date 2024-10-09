import {useContext, useEffect, useState} from 'react';
import {Vehicle, VehicleContext} from './VehicleProvider';
import {fetchModels, SearchContext} from './search-provider';
import DropDownSelector from './DropDownSelector';

export function CarDropDownSelectorDesignation({
  onClick,
}: {
  onClick: (key: keyof Vehicle, value: string | null) => void;
}) {
  const {make, model, designation} = useContext(VehicleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [designations, setDesignations] = useState<any[]>()
  useEffect(() => {
    if (make && model) {
      fetchModels(make, model).then((res) => {
        setDesignations(res)
      });
    }
  }, [make, model]);


  useEffect(() => {
    setIsOpen(false);
  }, [make, model]);

  const handleOpenChange = () => {
    if (make && model) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (value: string) => {
    onClick('designation', value);
    setIsOpen(false);
  };

  const transformItems = (items: any[], {results}: any) => {
    return items
      .map((item, index) => ({
        designation: item.designation,
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.designation === item.designation),
      )
      .sort((a, b) => {
        // Check if both are numbers, compare them numerically
        const numA = parseInt(a.designation, 10);
        const numB = parseInt(b.designation, 10);

        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }

        // Otherwise, compare as strings
        return a.designation.localeCompare(b.designation, undefined, {numeric: true});
      });
  };

  return (
    <DropDownSelector
      step={3}
      value={designation}
      isOpen={isOpen}
      title="Make a selection"
      onChange={handleOpenChange}
      placeHolder="1.4 TSi"
    >
       {designations &&
        designations.map((designation, index) => (
          <div
            className="hover:bg-white hover:text-black px-5 py-2.5"
            key={`model-${index}`}
            onClick={() => {
              // refine(item.value);
              handleSelect(designation);
            }}
          >
            {designation}
          </div>
        ))}
    </DropDownSelector>
  );
}

function Hit({hit, ...props}: any) {
  return (
    <div
      className="hover:bg-white hover:text-black px-5 py-2.5"
      key={hit}
      onClick={() => {
        // refine(item.value);
        props.onClick(hit.designation);
      }}
    >
      {hit.designation}
    </div>
  );
}
