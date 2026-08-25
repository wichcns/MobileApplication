import { User } from '../types/user';

export let user: User = {
  id: '',
  name: '',
  surname: '',
  email: '',
  phone: '',
  phoneNumber: '',
  avatar: null,
  cars: [],
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
    surname: '',
    email: '',
    phone: '',
    phoneNumber: '',
    avatar: null,
    cars: [],
  };
}
