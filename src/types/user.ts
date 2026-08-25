export interface User {
  id: string;
  _id?: string;

  name: string;
  surname?: string;

  username?: string;
  email: string;

  phone?: string;
  phoneNumber?: string;

  avatar: string | null;

  provider?: string;

  confirmed?: boolean;
  blocked?: boolean;

  isProfileCompleted?: boolean;
  isPhoneNumberVerified?: boolean;
  isBillingEmailVerified?: boolean;

  gender?: string | null;

  idApiV2?: string;

  cars?: unknown[];

  role?: {
    _id?: string;
    name?: string;
    description?: string;
    type?: string;
  };

  fcmTokens?: unknown[];

  billing_informations?: unknown[];

  createdAt?: string;
  updatedAt?: string;
}
