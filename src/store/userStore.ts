import { User } from '../types/user';

export let user: User = {
  id: 'USER001',

  name: 'SunPower User',

  email: 'user@sunpower.com',

  phone: '08X-XXX-XXXX',

  avatar: null,
};

export function updateUser(data: Partial<User>) {
  user = {
    ...user,
    ...data,
  };
}

export function clearUser() {
  user = {
    id: '',
    name: '',
    email: '',
    phone: '',
    avatar: null,
  };
}
