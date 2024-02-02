export interface IProfile {
  id: number;
  email: string;
  passwordHash: string;
  address: string;
  name: string;
  restoreToken: string | null;
  phone: string;
}

export interface IProfileRegister {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
