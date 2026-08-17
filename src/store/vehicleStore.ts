import { Vehicle } from '../types/vehicle';

export let vehicles: Vehicle[] = [
  {
    id: 'VH001',

    brand: 'BYD',

    model: 'Seal',

    year: 2025,

    color: 'White',

    plateNumber: '1กข1234',

    batteryCapacity: 82,

    connectorType: 'CCS2',

    maxACPower: 11,

    maxDCPower: 150,

    isDefault: true,
  },
];

export function addVehicle(vehicle: Vehicle) {
  vehicles = [...vehicles, vehicle];
}

export function updateVehicle(id: string, data: Partial<Vehicle>) {
  vehicles = vehicles.map(vehicle =>
    vehicle.id === id
      ? {
          ...vehicle,
          ...data,
        }
      : vehicle,
  );
}

export function deleteVehicle(id: string) {
  vehicles = vehicles.filter(vehicle => vehicle.id !== id);
}
