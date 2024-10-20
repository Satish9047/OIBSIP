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

export interface IRecipe {
  _id: string;
  name: string;
  totalQuantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPizzaRecipe {
  pizzaBase: IPizzaRecipeType[];
  sauce: IPizzaRecipeType[];
  cheese: IPizzaRecipeType[];
  veggies: IPizzaRecipeType[];
  nonVeg: IPizzaRecipeType[];
}

export interface IPizzaRecipeType {
  data: IRecipe;
  message: string;
  status: number;
  success: boolean;
}

export interface IRecipeResponse {
  data: IPizzaRecipe;
  message: string;
  status: number;
  success: boolean;
}

export interface IResponse {
  data: unknown;
  message: string;
  status: number;
  success: boolean;
}
