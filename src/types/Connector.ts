export type ConnectorStatus =
  | 'AVAILABLE'
  | 'CHARGING'
  | 'PREPARING'
  | 'FINISHING'
  | 'OFFLINE'
  | 'FAULTED'
  | 'RESERVED';

export interface Connector {
  connectorId: number;
  label: string; // A, B
  type: 'AC' | 'DC';
  power: number; // 22, 120
  status: ConnectorStatus;
}

export interface Charger {
  chargerId: string; // DC-01
  chargerName: string; // Fast Charger 1
  chargerType: 'AC' | 'DC';
  maxPower: number;

  connectors: Connector[];
}
