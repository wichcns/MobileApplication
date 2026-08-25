export type StationStatus = 'Available' | 'Busy' | 'Offline';

export type ChargerType = 'AC' | 'DC';

export type ConnectorStatus =
  | 'AVAILABLE'
  | 'CHARGING'
  | 'OFFLINE'
  | 'MAINTENANCE'
  | 'DISCONNECTED';

export interface Connector {
  connectorId: number | string;

  label: string;

  type: string;

  status: ConnectorStatus;

  powerElectricity?: number;

  disabled?: boolean;

  hasDoor?: boolean;

  hasSmartLock?: boolean;
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

  type?: string;

  phoneNumber?: string;
}

export interface Connector {
  connectorId: number | string;
  label: string;
  type: string;
  status: ConnectorStatus;

  powerElectricity?: number;

  // Battery / Charging Progress
  batteryPercentage?: number;

  disabled?: boolean;
  hasDoor?: boolean;
  hasSmartLock?: boolean;
}
