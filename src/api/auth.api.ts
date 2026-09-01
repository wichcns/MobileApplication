import apiClient from './client';

export const login = async (payload: any) => {
  try {
    console.log('===== LOGIN REQUEST =====');
    console.log('URL:', '/auth/local');
    console.log('Payload:', JSON.stringify(payload, null, 2));
    console.log('Identifier:', payload?.identifier);
    console.log('Password exists:', !!payload?.password);
    console.log('=========================');

    const response = await apiClient.post('/auth/local', payload);

    console.log('===== LOGIN API =====');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.log('====================');

    return response.data;
  } catch (error: any) {
    console.log('===== LOGIN API ERROR =====');
    console.log('Message:', error?.message);
    console.log('Status:', error?.response?.status);
    console.log('Response:', JSON.stringify(error?.response?.data, null, 2));
    console.log('===========================');

    throw error;
  }
};

export const register = async (payload: {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  role: 'individual';
}) => {
  const response = await apiClient.post('/auth/local/register', payload);
  return response.data;
};

export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const response = await apiClient.get('/auth/is-email-available', {
    params: { email: email.trim().toLowerCase() },
  });
  return response.data?.isAvailable === true;
};

export const getMe = async () => {
  try {
    const response = await apiClient.get('/users/me');

    console.log('===== GET ME API =====');
    console.log('Status:', response.status);
    console.log('Raw Data:', response.data);
    console.log('======================');

    return response.data;
  } catch (error: any) {
    console.log('===== GET ME API ERROR =====');
    console.log('Message:', error.message);
    console.log('Response:', error.response?.data);
    console.log('Status:', error.response?.status);
    console.log('============================');

    throw error;
  }
};

export const googleLogin = async (accessToken: string) => {
  try {
    console.log('===== GOOGLE LOGIN API =====');
    console.log('Provider:', 'google');
    console.log('Access Token Received:', !!accessToken);
    console.log('============================');

    const response = await apiClient.get(
      `/auth/google/callback?access_token=${encodeURIComponent(accessToken)}`,
    );

    console.log('===== GOOGLE LOGIN API SUCCESS =====');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.log('====================================');

    return response.data;
  } catch (error: any) {
    console.log('================================');
    console.log('===== GOOGLE LOGIN ERROR =====');
    console.log('================================');

    console.log('Error Code:', error?.code);
    console.log('Error Message:', error?.message);
    console.log('Error Response:', error?.response?.data);
    console.log('Error Status:', error?.response?.status);

    console.log('================================');

    throw error;
  }
};

export const updateMe = async (data: {
  name: string;
  surname?: string;
  email: string;
  phoneNumber: string;
  gender?: string | null;
  dateOfBirth?: string | null;
}) => {
  try {
    console.log('===== UPDATE PROFILE REQUEST =====');
    console.log('URL:', '/users/me');
    console.log('Payload:', data);
    console.log('=================================');

    const response = await apiClient.put('/users/me', data);

    console.log('===== UPDATE PROFILE SUCCESS =====');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.log('==================================');

    return response.data;
  } catch (error: any) {
    console.log('===== UPDATE PROFILE ERROR =====');
    console.log('Message:', error?.message);
    console.log('Response:', error?.response?.data);
    console.log('Status:', error?.response?.status);
    console.log('================================');

    throw error;
  }
};
