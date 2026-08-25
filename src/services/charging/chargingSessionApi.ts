import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { updateChargingSession } from '../../store/chargingStore';

const asNumber = (value: unknown) => Number(value ?? 0) || 0;

const formatDuration = (milliseconds: unknown) => {
  const seconds = Math.max(0, Math.floor(asNumber(milliseconds) / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return [hours, minutes, remainingSeconds]
    .map(value => value.toString().padStart(2, '0'))
    .join(':');
};

// Production has evolved across Strapi versions, so optional fields are mapped defensively.
export const syncChargingSession = (session: any) => {
  const connector = session?.connector ?? {};
  const chargingPoint = connector?.chargingPoint ?? {};
  const station = chargingPoint?.station ?? {};
  const energy = asNumber(session?.totalEnergy);
  const energyFee = asNumber(session?.totalEnergyFee ?? session?.totalFee);
  const extraFee = asNumber(session?.totalExtraFee);

  updateChargingSession({
    sessionId: String(session?.id ?? ''),
    stationId: String(station?.id ?? ''),
    stationName: station?.name ?? '',
    chargerId: String(chargingPoint?.id ?? chargingPoint?.serialNumber ?? ''),
    chargerName: chargingPoint?.name ?? chargingPoint?.serialNumber ?? '',
    connectorId: connector?.id ?? connector?.connectorId ?? 0,
    connectorLabel: connector?.name ?? String(connector?.connectorId ?? ''),
    connectorType: connector?.connectorType?.name ?? connector?.type ?? '',
    maxPower: asNumber(chargingPoint?.powerElectricity),
    status: session?.status ?? 'UNKNOWN',
    battery: asNumber(session?.transactions?.[0]?.stateOfCharge),
    energy,
    power: asNumber(session?.power),
    voltage: 0,
    current: 0,
    cost: energyFee,
    duration: formatDuration(session?.totalChargingDuration),
    startTime: session?.checkedInAt ?? session?.createdAt ?? '',
    endTime: session?.checkedOutAt ?? session?.completedAt ?? '',
    pricePerKwh: energy > 0 ? Number((energyFee / energy).toFixed(2)) : 0,
    serviceFee: extraFee,
    vat: 0,
    total: asNumber(session?.grandTotalFee),
  });
  return session;
};

export const getChargingSessionSummary = async (sessionId: string) => {
  const response = await apiClient.get(ENDPOINTS.chargingSessionSummary(sessionId));
  return syncChargingSession(response.data);
};

export const createAndCheckInChargingSession = async ({
  connectorId,
  qrCodePayload,
  accessCode,
}: {
  connectorId: string | number;
  qrCodePayload?: string;
  accessCode?: string;
}) => {
  let sessionId: string | undefined;
  try {
    const created = await apiClient.post(ENDPOINTS.chargingSessions, {
      connector: String(connectorId),
    });
    sessionId = String(created.data?.id);
    if (!sessionId || sessionId === 'undefined') {
      throw new Error('The charging session was not returned by the server');
    }
    await apiClient.post(
      ENDPOINTS.chargingSessionCheckIn(sessionId),
      qrCodePayload ? { qrCodePayload } : { accessCode },
    );
    const checkedIn = await getChargingSessionSummary(sessionId);
    return checkedIn;
  } catch (error) {
    if (sessionId) {
      try {
        await apiClient.post(ENDPOINTS.chargingSessionCancel(sessionId));
      } catch (cancelError) {
        console.log('[Charging] Unable to cancel incomplete session', {
          sessionId,
          message: cancelError instanceof Error ? cancelError.message : 'Unknown error',
        });
      }
    }
    throw error;
  }
};

export const stopChargingSessionOnServer = async (sessionId: string) => {
  const response = await apiClient.post(ENDPOINTS.chargingSessionStop(sessionId));
  return syncChargingSession(response.data);
};

export const startChargingSessionOnServer = async (sessionId: string) => {
  const response = await apiClient.post(ENDPOINTS.chargingSessionStart(sessionId));
  return syncChargingSession(response.data);
};

export const setChargingPaymentMethod = async (
  sessionId: string,
  paymentMethod: 'CREDIT' | 'CREDIT_CARD',
) => {
  const response = await apiClient.put(
    ENDPOINTS.chargingSessionPaymentMethod(sessionId),
    { paymentMethod },
  );
  return syncChargingSession(response.data);
};

export const preAuthorizeChargingCard = async (sessionId: string, cardId: string) => {
  const response = await apiClient.post(
    ENDPOINTS.chargingSessionPreAuthorize(sessionId),
    { method: 'CREDIT_CARD', card: cardId, isSaveCard: true, isExistingCard: true },
  );
  return response.data;
};

export const checkOutChargingSessionOnServer = async (sessionId: string) => {
  const response = await apiClient.post(ENDPOINTS.chargingSessionCheckOut(sessionId));
  return syncChargingSession(response.data);
};
