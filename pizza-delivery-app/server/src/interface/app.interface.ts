import { Cheese } from "../models/cheese.model";
import { NonVeg } from "../models/nonVeg.model";
import { PizzaBase } from "../models/pizzaBase.model";
import { Sauce } from "../models/sauce.model";
import { User } from "../models/user.model";
import { Veggies } from "../models/veggies.model";

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

export interface Pizza {
  user: typeof User;
  pizzaBase: typeof PizzaBase;
  sauceType: typeof Sauce;
  cheeseType: typeof Cheese;
  veggies: typeof Veggies;
  nonVeg: typeof NonVeg;
  quantity: number;
  isDelivered: boolean;
  paid?: boolean;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
