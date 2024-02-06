export interface IProfile {
  id: number;
  email: string;
  passwordHash: string;
  address: string;
  name: string;
  restoreToken: string | null;
  phone: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IProfileUpdate {
  address?: string;
  name?: string;
  phone?: string;
}
