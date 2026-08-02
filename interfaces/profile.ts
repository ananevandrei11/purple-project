export interface IProfile {
  id: number;
  email: string;
  passwordHash?: string;
  address: string;
  name: string;
  phone: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export type ILoginMode = 'login' | 'register' | 'restore';

export interface IProfileUpdate {
  address?: string;
  name?: string;
  phone?: string;
}
