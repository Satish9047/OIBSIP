export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  verificationToken: string;
  isVerified: boolean;
  _v: number;
  createdAt: string;
  updatedAt: string;
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
  data: IUser;
  message: string;
  status: number;
  success: boolean;
}
