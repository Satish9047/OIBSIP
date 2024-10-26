// interface for user state in redux
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isVerified: boolean;
  _v: number;
  createdAt: string;
  updatedAt: string;
}

// Interface for sign up
export interface ISignUp {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

//Interface for sign in
export interface ISignIn {
  email: string;
  password: string;
}

//interface for response
export interface IAuthResponse {
  data: IUser | null;
  message: string;
  status: number;
  success: boolean;
}

//interface for inventory
export interface IPizzaRecipeType {
  data: IRecipe;
  message: string;
  status: number;
  success: boolean;
}

//interface for each recipe
export interface IRecipe {
  _id: string;
  name: string;
  totalQuantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

//interface for user's order
export interface IRecipeResponse {
  data: IPizzaRecipe | null;
  message: string;
  status: number;
  success: boolean;
}

export interface IPizzaRecipe {
  pizzaBase: IRecipe[];
  sauce: IRecipe[];
  cheese: IRecipe[];
  veggies: IRecipe[];
  nonVeg: IRecipe[];
}

export interface IResponse {
  data: unknown;
  message: string;
  status: number;
  success: boolean;
}

export interface IBill {
  basePrice: number;
  saucePrice: number;
  cheesePrice: number;
  veggiesPrice: number;
  nonVegPrice: number;
  deliveryCharge: number;
  totalPrice: number;
}
