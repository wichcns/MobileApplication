import { ChargingSession } from '../types/Charging';

// ==========================
// Initial Charging Session
// ==========================

export let chargingSession: ChargingSession = {
  // Session
  sessionId: '',

  // Station
  stationId: '',
  stationName: '',

  // Charger
  chargerId: '',
  chargerName: '',

  // Connector
  connectorId: 0,
  connectorLabel: '',
  connectorType: '',
  maxPower: 0,

  // Charging

  status: 'AVAILABLE',

  battery: 0,

  energy: 0,

  power: 0,

  voltage: 0,

  current: 0,

  cost: 0,

  duration: '00:00:00',

  startTime: '',

  endTime: '',

  // Payment

  serviceFee: 10,

  vat: 0,

  total: 0,

  // Transaction

  paymentMethod: '',

  paymentStatus: 'PENDING',

  transactionId: '',

  paidAt: '',
};

// ==========================
// Update Session
// ==========================

export function updateChargingSession(data: Partial<ChargingSession>) {
  chargingSession = {
    ...chargingSession,

    ...data,
  };

  listeners.forEach(listener => listener());
}

// ==========================
// Start Charging
// ==========================

export function startChargingSession(
  station: {
    id: string;

    name: string;
  },

  charger: {
    chargerId: string;

    chargerName?: string;

    chargerType: string;

    maxPower: number;
  },

  connector: {
    connectorId: number;

    label: string;

    type: string;
  },
) {
  updateChargingSession({
    // Session

    sessionId: `CHG-${Date.now()}`,

    // Station

    stationId: station.id,

    stationName: station.name,

    // Charger

    chargerId: charger.chargerId,

    chargerName: charger.chargerName ?? charger.chargerId,

    // Connector

    connectorId: connector.connectorId,

    connectorLabel: connector.label,

    connectorType: connector.type,

    maxPower: charger.maxPower,

    // Charging

    status: 'CHARGING',

    battery: 0,

    energy: 0,

    power: 0,

    voltage: 0,

    current: 0,

    cost: 0,

    duration: '00:00:00',

    startTime: new Date().toLocaleTimeString(),

    endTime: '',

    // Payment

    vat: 0,

    total: 0,

    paymentMethod: '',

    paymentStatus: 'PENDING',

    transactionId: '',

    paidAt: '',
  });
}

// ==========================
// Stop Charging
// ==========================

export function stopChargingSession() {
  const end = new Date();

  const subtotal = chargingSession.cost + chargingSession.serviceFee;

  const vat = Number((subtotal * 0.07).toFixed(2));

  const total = Number((subtotal + vat).toFixed(2));

  updateChargingSession({
    status: 'COMPLETED',

    endTime: end.toLocaleTimeString(),

    vat,

    total,
  });
}

// ==========================
// Payment Complete
// ==========================

export function completePayment(method: string, finalAmount?: number) {
  updateChargingSession({
    paymentMethod: method,

    paymentStatus: 'SUCCESS',

    transactionId: `TXN-${Date.now()}`,

    paidAt: new Date().toLocaleString(),

    ...(finalAmount !== undefined && {
      total: finalAmount,
    }),
  });
}

// ==========================
// Clear Session
// ==========================

export function clearChargingSession() {
  chargingSession = {
    sessionId: '',

    stationId: '',
    stationName: '',

    chargerId: '',
    chargerName: '',

    connectorId: 0,
    connectorLabel: '',
    connectorType: '',
    maxPower: 0,

    status: 'AVAILABLE',

    battery: 0,

    energy: 0,

    power: 0,

    voltage: 0,

    current: 0,

    cost: 0,

    duration: '00:00:00',

    startTime: '',

    endTime: '',

    serviceFee: 10,

    vat: 0,

    total: 0,

    paymentMethod: '',

    paymentStatus: 'PENDING',

    transactionId: '',

    paidAt: '',
  };
}

type Listener = () => void;

let listeners: Listener[] = [];

export function subscribeChargingSession(listener: Listener) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter(item => item !== listener);
  };
}
