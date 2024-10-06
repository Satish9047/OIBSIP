export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role?: string;
  verificationToken?: number;
  isVerified?: boolean;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface JwtUser {
  id: string;
  email: string;
}
