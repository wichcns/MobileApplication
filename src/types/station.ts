export type StationStatus = 'Available' | 'Busy' | 'Offline';

export type ChargerType = 'AC' | 'DC';

export type ConnectorStatus = 'AVAILABLE' | 'CHARGING' | 'OFFLINE';

export interface Connector {
  connectorId: number;

  label: string;

  type: string;

  status: ConnectorStatus;
}

export interface Charger {
  chargerId: string;

  chargerName: string;

  chargerType: ChargerType;

  maxPower: number;

  connectors: Connector[];
}

export interface Station {
  id: string;

  name: string;

  latitude: number;

  longitude: number;

  status: StationStatus;

  chargers: Charger[];

  price: number;

  address?: string;

  distance?: number;

  image?: string;
}
