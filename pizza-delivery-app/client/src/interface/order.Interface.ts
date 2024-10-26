export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IPizzaBase {
  _id: string;
  name: string;
}

export interface ISauceType {
  _id: string;
  name: string;
}

export interface ICheeseType {
  _id: string;
  name: string;
}

export interface IVeggie {
  _id: string;
  name: string;
}

export interface INonVeg {
  _id: string;
  name: string;
}

//Interface for order
export interface IGetUserOrder {
  data: IOrder[] | null;
  message: string;
  status: number;
  success: boolean;
}

export interface IOrder {
  _id: string;
  user: User;
  pizzaBase: IPizzaBase;
  sauceType: ISauceType;
  cheeseType: ICheeseType;
  veggies: IVeggie[];
  nonVeg: INonVeg[];
  quantity: number;
  isDelivered: boolean;
  paid: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
