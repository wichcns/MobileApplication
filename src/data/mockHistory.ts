import { ChargingHistory } from '../types/history';

export const mockHistory: ChargingHistory[] = [
  {
    id: '1',
    stationName: 'PTT EV Station',
    chargerName: 'ABB Terra 184',
    connectorType: 'CCS2',

    energy: 20.45,

    duration: 35,

    total: 96.3,

    status: 'COMPLETED',

    startTime: '2026-08-04 09:30',

    endTime: '2026-08-04 10:05',
  },

  {
    id: '2',
    stationName: 'EA Anywhere',
    chargerName: 'Delta DC Fast',
    connectorType: 'CCS2',

    energy: 15.8,

    duration: 28,

    total: 70,

    status: 'COMPLETED',

    startTime: '2026-08-03 16:40',

    endTime: '2026-08-03 17:08',
  },

  {
    id: '3',
    stationName: 'MEA EV Station',
    chargerName: 'ABB Terra AC',

    connectorType: 'Type 2',

    energy: 8.2,

    duration: 55,

    total: 42,

    status: 'FAILED',

    startTime: '2026-08-02 13:10',

    endTime: '2026-08-02 14:05',
  },
];
