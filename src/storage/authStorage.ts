import { createMMKV } from 'react-native-mmkv';

export const authStorage = createMMKV({
  id: 'auth-storage',
});

export const saveJwt = (jwt: string) => {
  authStorage.set('jwt', jwt);
};

export const getJwt = () => {
  return authStorage.getString('jwt');
};

export const removeJwt = () => {
  authStorage.remove('jwt');
};

export const saveUser = (user: any) => {
  authStorage.set('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = authStorage.getString('user');

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.log('===== AUTH USER PARSE ERROR =====');
    console.log(error);
    return null;
  }
};

export const removeUser = () => {
  authStorage.remove('user');
};

export const clearAuthStorage = () => {
  authStorage.remove('jwt');
  authStorage.remove('user');
};
