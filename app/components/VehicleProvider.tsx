import {ReactNode, createContext, useEffect, useState} from 'react';

export interface Vehicle {
  make: string | null;
  model: string | null;
  designation: string | null;
  id: string | null;
}

export interface VehicleDispatch {
  setState: (v?: Vehicle) => void;
}

export const defaultVehicleState: Vehicle = {
  make: null,
  model: null,
  designation: null,
  id: null,
};

export const VehicleContext = createContext<Vehicle>(defaultVehicleState);
export const VehicleDispatchContext = createContext<VehicleDispatch>({
  setState: () => {},
});

const key = 'vehicle';

function getSavedState() {
  if (typeof localStorage === undefined) return defaultVehicleState;
  const value = localStorage?.getItem(key);
  if (!value) return defaultVehicleState;
  const result = JSON.parse(value);
  return typeof result === 'object' ? (result as any) : defaultVehicleState;
}

export function VehicleProvider({children}: {children: ReactNode}) {
  const [state, setLocalState] = useState(defaultVehicleState);

  useEffect(() => {
    setLocalState(getSavedState());
  }, []);

  const setState = (v?: Vehicle) => {
    if (!v) return;
    setLocalState(v);
    if (typeof localStorage === undefined) return;
    localStorage.setItem(key, JSON.stringify(v));
  };

  return (
    <VehicleContext.Provider value={state}>
      <VehicleDispatchContext.Provider value={{setState}}>
        {children}
      </VehicleDispatchContext.Provider>
    </VehicleContext.Provider>
  );
}
