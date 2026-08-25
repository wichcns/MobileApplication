import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import { mapStationFromApi, mapStationsFromApi } from './mappers/station.mapper';

export const getStations = async (params?: Record<string, any>) => {
  try {
    const response = await apiClient.get(ENDPOINTS.stations, {
      params,
    });

    console.log('===== STATIONS API =====');

    console.log('Status:', response.status);

    console.log('Raw Data:', response.data);

    console.log('========================');

    return mapStationsFromApi(response.data);
  } catch (error: any) {
    console.log('===== STATIONS API ERROR =====');

    console.log('Message:', error.message);

    console.log('Response:', error.response?.data);

    console.log('Status:', error.response?.status);

    console.log('==============================');

    throw error;
  }
};

export const getStationById = async (
  id: string | number,
  params?: Record<string, any>,
) => {
  try {
    const response = await apiClient.get(ENDPOINTS.stationDetail(id), {
      params,
    });

    return mapStationFromApi(response.data);
  } catch (error: any) {
    console.log('===== STATION DETAIL API ERROR =====');

    console.log('Message:', error.message);

    console.log('Response:', error.response?.data);

    console.log('Status:', error.response?.status);

    console.log('====================================');

    throw error;
  }
};
