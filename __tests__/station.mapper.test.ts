import { mapStationFromApi } from '../src/api/mappers/station.mapper';

describe('station mapper', () => {
  it('maps AC and DC chargers from backend connector data', () => {
    const station = mapStationFromApi({
      id: 'station-1',
      name: 'Backend station',
      status: 'OPEN',
      latitude: 13.75,
      longitude: 100.5,
      chargingPoints: [
        {
          id: 'ac-1',
          connectorType: { current: 'AC' },
          powerElectricity: 7,
          connectors: [
            {
              id: 1,
              status: 'AVAILABLE',
              connectorType: { name: 'Type 2' },
              powerElectricity: 7,
            },
          ],
        },
        {
          id: 'dc-1',
          connectors: [
            {
              id: 2,
              status: 'AVAILABLE',
              connectorType: { name: 'CCS2' },
              maxPower: 120,
            },
          ],
        },
      ],
      serviceRates: [
        { price: 7.5, startTime: '09:00:00', endTime: '24:00:00' },
      ],
    });

    expect(station.chargers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ chargerType: 'AC', maxPower: 7 }),
        expect.objectContaining({ chargerType: 'DC', maxPower: 120 }),
      ]),
    );
    expect(station.price).toBe(7.5);
    expect(station.priceSchedule).toBe('09.00 - 24.00');
  });

  it('does not invent optional station information missing from backend', () => {
    const station = mapStationFromApi({
      id: 'station-2',
      name: 'Minimal station',
      status: 'OPEN',
      chargingPoints: [],
    });

    expect(station.distance).toBeUndefined();
    expect(station.openingHours).toBeUndefined();
    expect(station.priceSchedule).toBeUndefined();
  });

  it('maps latitude and longitude from common backend location shapes', () => {
    const station = mapStationFromApi({
      id: 'station-3',
      name: 'Coordinates station',
      status: 'OPEN',
      location: {
        coordinates: [100.5018, 13.7563],
      },
      chargingPoints: [],
    });

    expect(station.latitude).toBe(13.7563);
    expect(station.longitude).toBe(100.5018);
  });
});
