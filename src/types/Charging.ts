export interface ChargingSession {
  sessionId: string;

  stationId: string;

  stationName: string;

  chargerId: string;

  chargerName: string;

  connectorId: number;

  connectorLabel: string;

  connectorType: string;

  maxPower: number;

  status: string;

  battery: number;

  energy: number;

  power: number;

  voltage: number;

  current: number;

  cost: number;

  duration: string;

  startTime: string;

  endTime: string;

  serviceFee: number;

  vat: number;

  total: number;

  pricePerKwh: number;
  // เพิ่มใหม่

  paymentMethod?: string;

  paymentStatus?: 'PENDING' | 'SUCCESS' | 'FAILED';

  transactionId?: string;

  paidAt?: string;
}
