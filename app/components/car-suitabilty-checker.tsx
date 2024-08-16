import {AnimatePresence, motion} from 'framer-motion';
import {useContext, useState} from 'react';
import {
  Vehicle,
  VehicleContext,
  VehicleDispatchContext,
  defaultVehicleState,
} from './VehicleProvider';
import {CarSelectorMake} from './car-selector-1-make';
import {CarSelectorModel} from './car-selector-2-model';
import {CarSelectorDesignation} from './car-selector-3-designation';
import {CarSelectorContainer} from './car-selector-container';
import {CarSelectorSuitability} from './car-selector-suitability';

export function CarSuitabilityChecker({sku}: {sku: string}) {
  const state = useContext(VehicleContext);
  const [open, setOpen] = useState(false);
  const {setState: update} = useContext(VehicleDispatchContext);

  function setState(key: keyof Vehicle, value: string | null) {
    update({
      ...state,
      [key]: value,
    });
  }

  function clearState() {
    update(defaultVehicleState);
  }

  const selectedTab = open
    ? state.make
      ? state.model
        ? state.id
          ? 0
          : 3
        : 2
      : 1
    : 0;

  const tabs = [
    <CarSelectorSuitability
      sku={sku}
      onClick={() => {
        setOpen(true);
        clearState();
      }}
    />,
    <CarSelectorMake title="Find your vehicle" onClick={setState} />,
    <CarSelectorModel onReset={clearState} onClick={setState} />,
    <CarSelectorDesignation onReset={clearState} onClick={setState} />,
  ];

  return (
    <CarSelectorContainer open={selectedTab === 0}>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab : 0}
          initial={{y: 10, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: -10, opacity: 0}}
          transition={{duration: 0.2}}
        >
          {tabs[selectedTab]}
        </motion.div>
      </AnimatePresence>
    </CarSelectorContainer>
  );
}
