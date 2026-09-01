import {
  Charger,
  Connector,
  Station,
  StationStatus,
  ChargerType,
  ConnectorStatus,
} from '../../types/station';

/**
 * ============================================================
 * Station Status
 * ============================================================
 *
 * Production API:
 *
 * station.status
 * OPEN / CLOSED / ...
 *
 * chargingPoints[].connectors[].status
 *
 * AVAILABLE
 * CHARGING
 * ...
 */
const mapStationStatus = (
  station: any,
  chargingPoints: any[],
): StationStatus => {
  // Station ปิด
  if (station?.status === 'CLOSED') {
    return 'Offline';
  }

  // Station ไม่ได้เปิด
  if (station?.status !== 'OPEN') {
    return 'Offline';
  }

  // มี Connector ที่พร้อมใช้งาน
  const hasAvailable = chargingPoints.some(point =>
    (point?.connectors ?? []).some(
      (connector: any) =>
        connector?.status === 'AVAILABLE' && !connector?.disabled,
    ),
  );

  // มี Connector ที่กำลังชาร์จ
  const hasCharging = chargingPoints.some(point =>
    (point?.connectors ?? []).some(
      (connector: any) => connector?.status === 'CHARGING',
    ),
  );

  if (hasCharging) {
    return 'Busy';
  }

  if (hasAvailable) {
    return 'Available';
  }

  return 'Offline';
};

/**
 * ============================================================
 * Connector Status
 * ============================================================
 */
const mapConnectorStatus = (connector: any): ConnectorStatus => {
  // disabled มาก่อน status
  if (connector?.disabled) {
    return 'OFFLINE';
  }

  switch (connector?.status) {
    case 'AVAILABLE':
      return 'AVAILABLE';

    case 'CHARGING':
      return 'CHARGING';

    case 'MAINTENANCE':
      return 'MAINTENANCE';

    case 'DISCONNECTED':
      return 'DISCONNECTED';

    default:
      return 'OFFLINE';
  }
};

/**
 * ============================================================
 * Charger Type
 * ============================================================
 */
const mapChargerType = (chargingPoint: any): ChargerType => {
  const current = chargingPoint?.connectorType?.current?.toUpperCase();

  if (current === 'DC') {
    return 'DC';
  }

  return 'AC';
};

/**
 * ============================================================
 * Connector Mapper
 * ============================================================
 */
const mapConnector = (
  connector: any,
  fallbackId?: string | number,
): Connector => {
  return {
    connectorId: connector?.id ?? connector?._id ?? fallbackId ?? 'unknown',

    label: connector?.name ?? connector?.connectorName ?? 'Connector',

    type:
      connector?.connectorType?.name ??
      connector?.connectorType?.key ??
      connector?.connectorType?.current ??
      'AC',

    status: mapConnectorStatus(connector),

    powerElectricity: connector?.powerElectricity ?? 0,

    batteryPercentage:
      connector?.batteryPercentage ??
      connector?.batteryLevel ??
      connector?.soc ??
      connector?.stateOfCharge ??
      undefined,

    disabled: connector?.disabled ?? false,

    hasDoor: connector?.hasDoor ?? false,

    hasSmartLock: connector?.hasSmartLock ?? false,
  };
};

/**
 * ============================================================
 * Charging Point → Charger
 * ============================================================
 *
 * Production API ใช้ชื่อ chargingPoints
 *
 * แต่ MobileApplicationNew ใช้ chargers
 *
 * ดังนั้น mapper จะแปลงตรงนี้
 */
const mapChargingPoint = (chargingPoint: any): Charger => {
  const rawConnectors = Array.isArray(chargingPoint?.connectors)
    ? chargingPoint.connectors
    : [];

  return {
    chargerId: String(
      chargingPoint?.id ??
        chargingPoint?._id ??
        chargingPoint?.chargingPointId ??
        '',
    ),

    chargerName:
      chargingPoint?.name ?? chargingPoint?.serialNumber ?? 'Charger',

    chargerType: mapChargerType(chargingPoint),

    maxPower: Number(chargingPoint?.powerElectricity ?? 0),

    connectors: rawConnectors.map((connector: any, index: number) =>
      mapConnector(connector, `${chargingPoint?.id ?? 'charger'}-${index}`),
    ),
  };
};

/**
 * ============================================================
 * Station Mapper
 * ============================================================
 */
export const mapStationFromApi = (station: any): Station => {
  /**
   * Production Charging Points
   */
  const chargingPoints = Array.isArray(station?.chargingPoints)
    ? station.chargingPoints
    : [];

  /**
   * แปลง Charging Points
   * เป็น chargers ที่ Mobile App ใช้
   */
  const chargers: Charger[] = chargingPoints.map(mapChargingPoint);

  /**
   * ราคา
   */
  const serviceRates = Array.isArray(station?.serviceRates)
    ? station.serviceRates
    : [];

  const price =
    serviceRates.length > 0 ? Number(serviceRates[0]?.price ?? 0) : 0;

  /**
   * รูปภาพ
   */
  const image =
    Array.isArray(station?.images) && station.images.length > 0
      ? station.images[0]?.url
      : undefined;

  /**
   * Address
   */
  const addressData = station?.address;

  const address = addressData
    ? [
        addressData.address1,
        addressData.address2,
        addressData.city,
        addressData.country,
        addressData.postcode,
      ]
        .filter(Boolean)
        .join(', ')
    : undefined;

  /**
   * Status
   */
  const status = mapStationStatus(station, chargingPoints);

  /**
   * Return ตาม Station type
   *
   * สำคัญ:
   * ไม่คืน chargingPoints
   * ไม่คืน serviceRates
   * ไม่คืน facilities
   *
   * เพราะ UI ของเราจะใช้ chargers
   */
  return {
    id: String(station?.id ?? station?._id ?? ''),

    name: station?.name ?? 'Unknown Station',

    latitude: Number(station?.latitude ?? 0),

    longitude: Number(station?.longitude ?? 0),

    status,

    chargers,

    price,

    address,

    image,

    distance: station?.distance,

    type: station?.type,

    phoneNumber: station?.phoneNumber,
  };
};

/**
 * ============================================================
 * Stations Mapper
 * ============================================================
 */
export const mapStationsFromApi = (data: any): Station[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapStationFromApi);
};
