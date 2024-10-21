import {useContext, useEffect, useState} from 'react';
import {Vehicle, VehicleContext} from './VehicleProvider';
import {fetchModels, SearchContext} from './search-provider';
import DropDownSelector from './DropDownSelector';

export function CarDropDownSelectorModel({
  onClick,
}: {
  onClick: (key: keyof Vehicle, value: string | null) => void;
}) {
  const {make, model} = useContext(VehicleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [models, setModels] = useState<any[]>();

  useEffect(() => {
    if (make) {
      fetchModels(make).then((res) => {
        setModels(res);
      });
    }
  }, [make]);

  useEffect(() => {
    setIsOpen(false);
  }, [make]);

  const handleOpenChange = () => {
    if (make) {
      setIsOpen((prev) => !prev);
    }
  };
  const handleSelect = (value: string) => {
    onClick('model', value);
    setIsOpen(false);
  };

  return (
    <DropDownSelector
      step={2}
      value={model}
      isOpen={isOpen}
      title="Select a Model"
      onChange={handleOpenChange}
      placeHolder="Make a selection"
    >
      {models &&
        models.map((model, index) => (
          <div
            className="hover:bg-white hover:text-black px-5 py-2.5"
            key={`model-${index}`}
            onClick={() => {
              // refine(item.value);
              handleSelect(model);
            }}
          >
            {model}
          </div>
        ))}
    </DropDownSelector>
  );
}


/* <select
      value={selectedValue}
      onChange={(event) => {
        refine(event.target.value);
      }}
    >
      {items.map((item) => (
        <option value={item.value}>
          {item.label} ({item.count})
        </option>
      ))}
    </select> */
