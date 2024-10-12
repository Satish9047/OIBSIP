export interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ISignUp {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IAuthResponse {
  data: IUser | null;
  message: string;
  status: number;
  success: boolean;
}
