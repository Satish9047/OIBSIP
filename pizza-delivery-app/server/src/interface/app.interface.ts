export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isVerified: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
