import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export const getWalletBalance = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.walletBalance);

    console.log('===== WALLET BALANCE API =====');
    console.log('Status:', response.status);
    console.log('Raw Data:', response.data);
    console.log('==============================');

    return response.data;
  } catch (error: any) {
    console.log('===== WALLET BALANCE API ERROR =====');
    console.log('Message:', error.message);
    console.log('Response:', error.response?.data);
    console.log('Status:', error.response?.status);
    console.log('====================================');

    throw error;
  }
};

export const getWalletHistory = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(ENDPOINTS.walletHistory, {
      params: {
        page,
        limit,
      },
    });

    console.log('===== WALLET HISTORY API =====');
    console.log('Status:', response.status);
    console.log('Raw Data:', response.data);
    console.log('===============================');

    return response.data;
  } catch (error: any) {
    console.log('===== WALLET HISTORY API ERROR =====');
    console.log('Message:', error.message);
    console.log('Response:', error.response?.data);
    console.log('Status:', error.response?.status);
    console.log('====================================');

    throw error;
  }
};

export const topUpWallet = async (payload: any) => {
  try {
    const response = await apiClient.post(ENDPOINTS.walletTopUp, payload);

    console.log('===== WALLET TOP UP API =====');
    console.log('Status:', response.status);
    console.log('Raw Data:', response.data);
    console.log('==============================');

    return response.data;
  } catch (error: any) {
    console.log('===== WALLET TOP UP API ERROR =====');
    console.log('Message:', error.message);
    console.log('Response:', error.response?.data);
    console.log('Status:', error.response?.status);
    console.log('====================================');

    throw error;
  }
};
