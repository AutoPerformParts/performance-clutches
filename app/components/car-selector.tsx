import {AnimatePresence, motion} from 'framer-motion';
import {useContext} from 'react';
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

export function CarSelector() {
  const state = useContext(VehicleContext);
  const {setState: update} = useContext(VehicleDispatchContext);

  function setState(key: keyof Vehicle, value: string | null) {
    update({
      ...state,
      [key]: value,
    });
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

  const tabs = [
    <CarSelectorMake
      title={
        <>
          Find your <span className="text-primary-600">perfect</span> clutch
        </>
      }
      onClick={setState}
    />,
    <CarSelectorModel onReset={clearState} onClick={setState} />,
    <CarSelectorDesignation onReset={clearState} onClick={setDesignation} />,
    <CarSelectorOptions onReset={clearState} />,
    <CarSelectorOverview onReset={clearState} onClick={setState} />,
  ];

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
          {tabs[selectedTab]}
        </motion.div>
      </AnimatePresence>
    </CarSelectorContainer>
  );
}
