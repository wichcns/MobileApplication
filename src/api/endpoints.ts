export const ENDPOINTS = {
  login: '/auth/local',
  stations: '/stations',
  stationDetail: (id: string | number) => `/stations/${id}`,

  walletBalance: '/payment/credits/balance',
  walletHistory: '/payment/credits/history',
  walletTopUp: '/payment/credits/top-up',

  chargingSessions: '/charging-sessions/me',
  chargingSessionHistories: '/charging-sessions/histories',
  chargingSession: (id: string) => `/charging-sessions/${id}`,
  chargingSessionSummary: (id: string) => `/charging-sessions/${id}/summary`,
  chargingSessionCheckIn: (id: string) =>
    `/charging-sessions/${id}/check-in-reserve`,
  chargingSessionStart: (id: string) => `/charging-sessions/${id}/start-charge`,
  chargingSessionStop: (id: string) => `/charging-sessions/${id}/stop-charge`,
  chargingSessionCancel: (id: string) => `/charging-sessions/${id}/cancel`,
  chargingSessionPaymentMethod: (id: string) =>
    `/charging-sessions/${id}/payment-method`,
  chargingSessionCheckOut: (id: string) => `/charging-sessions/${id}/check-out`,
  chargingSessionPreAuthorize: (id: string) =>
    `/payment/charging-sessions/${id}/pre-authorize`,
};
