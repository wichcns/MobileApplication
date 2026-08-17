import { create } from 'zustand';

import { Charger, Connector } from '../types/station';

interface ChargerStore {
  chargers: Charger[];

  selectedCharger?: Charger;

  setChargers: (chargers: Charger[]) => void;

  setSelectedCharger: (charger: Charger) => void;

  clearSelectedCharger: () => void;

  clearChargers: () => void;

  getChargerById: (chargerId: string) => Charger | undefined;

  getAvailableChargers: () => Charger[];

  selectedConnector?: Connector;

  setSelectedConnector: (connector: Connector) => void;

  clearSelectedConnector: () => void;
}

export const useChargerStore = create<ChargerStore>((set, get) => ({
  chargers: [],

  selectedCharger: undefined,

  setChargers: chargers =>
    set({
      chargers,
    }),

  setSelectedCharger: charger =>
    set({
      selectedCharger: charger,
    }),

  clearSelectedCharger: () =>
    set({
      selectedCharger: undefined,
    }),

  clearChargers: () =>
    set({
      chargers: [],
    }),

  getChargerById: chargerId =>
    get().chargers.find(charger => charger.chargerId === chargerId),

  getAvailableChargers: () =>
    get().chargers.filter(charger =>
      charger.connectors.some(connector => connector.status === 'AVAILABLE'),
    ),

  setSelectedConnector: connector =>
    set({
      selectedConnector: connector,
    }),

  clearSelectedConnector: () =>
    set({
      selectedConnector: undefined,
    }),
}));
