'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AtmosphereContext = createContext();

export function AtmosphereProvider({ children }) {
  const [lightingMode, setLightingMode] = useState('day');

  // Sync state changes with the DOM element classes instantly
  useEffect(() => {
    const root = document.documentElement;
    if (lightingMode === 'night') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [lightingMode]);

  return (
    <AtmosphereContext.Provider value={{ lightingMode, setLightingMode }}>
      {children}
    </AtmosphereContext.Provider>
  );
}

export const useAtmosphere = () => useContext(AtmosphereContext);