import { Charger } from '../types/station';

export function createChargers(): Charger[] {
  return [
    {
      chargerId: 'CH001',

      chargerName: 'AC Charger 1',

      chargerType: 'AC',

      maxPower: 22,

      connectors: [
        {
          connectorId: 1,

          label: 'Type 2',

          type: 'AC',

          status: 'AVAILABLE',
        },

        {
          connectorId: 2,

          label: 'Type 2',

          type: 'AC',

          status: 'CHARGING',
        },
      ],
    },

    {
      chargerId: 'CH002',

      chargerName: 'DC Fast Charger 1',

      chargerType: 'DC',

      maxPower: 120,

      connectors: [
        {
          connectorId: 3,

          label: 'CCS',

          type: 'DC',

          status: 'AVAILABLE',
        },

        {
          connectorId: 4,

          label: 'CCS',

          type: 'DC',

          status: 'OFFLINE',
        },
      ],
    },
  ];
}
