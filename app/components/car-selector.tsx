import {AnimatePresence, motion} from 'framer-motion';
import {useContext, useMemo} from 'react';
import {
  Vehicle,
  VehicleContext,
  VehicleDispatchContext,
  defaultVehicleState,
} from './VehicleProvider';
import {CarSelectorMake} from './car-selector-1-make';
import {CarSelectorModel} from './car-selector-2-model';
import {CarSelectorDesignation} from './car-selector-3-designation';
import {CarSelectorOptions} from './car-selector-4-options';
import {CarSelectorContainer} from './car-selector-container';
import {CarSelectorOverview} from './car-selector-overview';
import DropDownSelector from './DropDownSelector';
import {manufacturers} from '../util/manufacturers';
import {CarDropDownSelectorModel} from './car-drop-selector-2-model';
import CarDropSelectorMake from './car-drop-selector-1-make';
import {CarDropDownSelectorDesignation} from './car-drop-selector-3-designation';
import {CarDropSelectorOptions} from './car-drop-selector-4-options';

export function CarSelector() {
  const state = useContext(VehicleContext);
  const {setState: update} = useContext(VehicleDispatchContext);

  function setState(key: keyof Vehicle, value: string | null) {
    switch (key) {
      case 'make':
        update({
          make: value,
          model: null,
          designation: null,
          id: null,
        });
        break;
      case 'model':
        update({
          make: state.make,
          model: value,
          designation: null,
          id: null,
        });
        break;
      default:
        update({
          ...state,
          [key]: value,
        });
    }
  }

  function setDesignation(key: Vehicle['id'], value: Vehicle['designation']) {
    update({
      ...state,
      id: key,
      designation: value,
    });
  }

  function clearState() {
    update(defaultVehicleState);
  }

  const selectedTab = state.make ? (state.model ? (state.id ? 3 : 2) : 1) : 0;

  const manufacturersValues = useMemo(
    () => manufacturers.map((e) => e.title),
    [],
  );

  return (
    <CarSelectorContainer open={false}>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab : 0}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.1}}
        >
          <div className="p-3 lg:p-6 z-50">
            <h1 className="font-titles font-bold uppercase text-3xl text-center pb-3">
              Find your <span className="text-primary-600">perfect</span> clutch
            </h1>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <CarDropSelectorMake
                onClick={setState}
                values={manufacturersValues}
              />
              <CarDropDownSelectorModel onClick={setState} />
              <CarDropDownSelectorDesignation onClick={setState} />
            </div>
            {state.make && state.model && state.designation && (
              <CarDropSelectorOptions onReset={clearState} />
            )}
          </div>
          {/* {tabs[selectedTab]} */}
        </motion.div>
      </AnimatePresence>
    </CarSelectorContainer>
  );
}
