export type VehicleConnector = 'TYPE2' | 'CCS2' | 'CHAdeMO' | 'GB/T';

export interface Vehicle {
  id: string;

  brand: string;

  model: string;

  year: number;

  color: string;

  plateNumber: string;

  batteryCapacity: number;

  connectorType: VehicleConnector;

  maxACPower: number;

  maxDCPower: number;

  isDefault: boolean;
}
