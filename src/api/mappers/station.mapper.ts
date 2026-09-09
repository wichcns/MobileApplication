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
  const rawConnectors = Array.isArray(chargingPoint?.connectors)
    ? chargingPoint.connectors
    : [];

  const candidates = [
    chargingPoint?.chargerType,
    chargingPoint?.current,
    chargingPoint?.connectorType,
    chargingPoint?.connectorType?.current,
    chargingPoint?.connectorType?.key,
    chargingPoint?.connectorType?.name,
    ...rawConnectors.flatMap((connector: any) => [
      connector?.type,
      connector?.current,
      connector?.connectorType,
      connector?.connectorType?.current,
      connector?.connectorType?.key,
      connector?.connectorType?.name,
    ]),
  ]
    .filter(value => typeof value === 'string')
    .map(value => value.trim().toUpperCase());

  if (
    candidates.some(
      value =>
        value === 'DC' ||
        value.includes('CCS') ||
        value.includes('CHADEMO') ||
        value.includes('GB/T DC'),
    )
  ) {
    return 'DC';
  }

  if (
    candidates.some(
      value =>
        value === 'AC' ||
        value.includes('TYPE 2') ||
        value.includes('TYPE2') ||
        value.includes('J1772'),
    )
  ) {
    return 'AC';
  }

  return 'UNKNOWN';
};

const readConnectorType = (connector: any): string => {
  const candidates = [
    connector?.type,
    connector?.connectorType?.name,
    connector?.connectorType?.key,
    connector?.connectorType?.current,
    connector?.connectorType,
  ];

  return (
    candidates
      .find(value => typeof value === 'string' && value.trim().length > 0)
      ?.trim() ?? 'Unknown'
  );
};

const readNumber = (...values: any[]): number => {
  const value = values.find(candidate => {
    const number = Number(candidate);
    return (
      candidate != null &&
      candidate !== '' &&
      Number.isFinite(number) &&
      number > 0
    );
  });

  return value == null ? 0 : Number(value);
};

const readCoordinate = (...values: any[]): number => {
  const value = values.find(candidate => Number.isFinite(Number(candidate)));

  return value == null ? 0 : Number(value);
};

const formatTime = (value: any): string | undefined => {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }

  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  return match ? `${match[1].padStart(2, '0')}.${match[2]}` : value.trim();
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

    type: readConnectorType(connector),

    status: mapConnectorStatus(connector),

    powerElectricity: readNumber(
      connector?.powerElectricity,
      connector?.maxPower,
      connector?.power,
    ),

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

  const connectorMaxPower = Math.max(
    0,
    ...rawConnectors.map((connector: any) =>
      readNumber(
        connector?.powerElectricity,
        connector?.maxPower,
        connector?.power,
      ),
    ),
  );

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

    maxPower: readNumber(
      chargingPoint?.powerElectricity,
      chargingPoint?.maxPower,
      chargingPoint?.power,
      connectorMaxPower,
    ),

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
  const coordinateArray = Array.isArray(station?.coordinates)
    ? station.coordinates
    : Array.isArray(station?.location?.coordinates)
    ? station.location.coordinates
    : [];

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
    serviceRates.length > 0 ? readNumber(serviceRates[0]?.price) : 0;

  const firstServiceRate = serviceRates[0];
  const priceStart = formatTime(
    firstServiceRate?.startTime ??
      firstServiceRate?.fromTime ??
      firstServiceRate?.startAt,
  );
  const priceEnd = formatTime(
    firstServiceRate?.endTime ??
      firstServiceRate?.toTime ??
      firstServiceRate?.endAt,
  );
  const priceSchedule =
    priceStart && priceEnd ? `${priceStart} - ${priceEnd}` : undefined;

  const openingStart = formatTime(
    station?.openingTime ?? station?.openTime ?? station?.opensAt,
  );
  const openingEnd = formatTime(
    station?.closingTime ?? station?.closeTime ?? station?.closesAt,
  );
  const openingHours =
    typeof (station?.openingHours ?? station?.operatingHours) === 'string'
      ? station.openingHours ?? station.operatingHours
      : openingStart && openingEnd
      ? `${openingStart} - ${openingEnd}`
      : undefined;

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

    latitude: readCoordinate(
      station?.latitude,
      station?.lat,
      station?.location?.latitude,
      station?.location?.lat,
      station?.address?.latitude,
      coordinateArray[1],
    ),

    longitude: readCoordinate(
      station?.longitude,
      station?.lng,
      station?.lon,
      station?.location?.longitude,
      station?.location?.lng,
      station?.address?.longitude,
      coordinateArray[0],
    ),

    status,

    chargers,

    price,

    priceSchedule,

    openingHours,

    address,

    image,

    distance:
      station?.distance != null && Number.isFinite(Number(station.distance))
        ? Number(station.distance)
        : undefined,

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
