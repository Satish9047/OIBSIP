import { Sauce } from "../models/sauce.model";
import { Cheese } from "../models/cheese.model";
import { NonVeg } from "../models/nonVeg.model";
import { Veggies } from "../models/veggies.model";
import { PizzaBase } from "../models/pizzaBase.model";

const addPizzaBaseService = async (data: typeof PizzaBase) => {
  const pizzaBase = await PizzaBase.create(data);
  return pizzaBase;
};

const updatePizzaBaseService = async (id: string, quantity: number) => {
  const base = await PizzaBase.findById(id);
  if (!base) {
    throw new Error("Pizza base not found");
  }
  const totalQuantity = base.totalQuantity + quantity;
  const pizzaBase = await PizzaBase.findByIdAndUpdate(
    id,
    { totalQuantity },
    {
      new: true,
    }
  );
  return pizzaBase;
};

const addSauceService = async (data: typeof Sauce) => {
  const sauce = await Sauce.create(data);
  return sauce;
};

const updateSauceService = async (id: string, quantity: number) => {
  const sauceType = await Sauce.findById(id);
  if (!sauceType) {
    throw new Error("Sauce not found");
  }
  const totalQuantity = sauceType.totalQuantity + quantity;
  const sauce1 = await Sauce.findByIdAndUpdate(
    id,
    { totalQuantity },
    {
      new: true,
    }
  );
  return sauce1;
};

const addCheeseService = async (data: typeof Cheese) => {
  const cheese = await Cheese.create(data);
  return cheese;
};

const updateCheeseService = async (id: string, quantity: number) => {
  const cheeseType = await Cheese.findById(id);
  if (!cheeseType) {
    throw new Error("Cheese not found");
  }
  const totalQuantity = cheeseType.totalQuantity + quantity;
  const cheese = await Cheese.findByIdAndUpdate(
    id,
    { totalQuantity },
    {
      new: true,
    }
  );
  return cheese;
};

const addVeggiesService = async (data: typeof Veggies) => {
  const veggies = await Veggies.create(data);
  return veggies;
};

const updateVeggiesService = async (id: string, quantity: number) => {
  const veggiesType = await Veggies.findById(id);
  if (!veggiesType) {
    throw new Error("Veggies not found");
  }
  const totalQuantity = veggiesType.totalQuantity + quantity;
  const veggies = await Veggies.findByIdAndUpdate(
    id,
    { totalQuantity },
    {
      new: true,
    }
  );
  return veggies;
};

const addNonVegService = async (data: typeof NonVeg) => {
  const nonVeg = await NonVeg.create(data);
  return nonVeg;
};

const updateNonVegService = async (id: string, quantity: number) => {
  const nonVegType = await NonVeg.findById(id);
  if (!nonVegType) {
    throw new Error("Non-veg not found");
  }
  const totalQuantity = nonVegType.totalQuantity + quantity;
  const nonVeg = await NonVeg.findByIdAndUpdate(
    id,
    { totalQuantity },
    {
      new: true,
    }
  );
  return nonVeg;
};

const getAllRecipeService = async () => {
  const pizzaBase = await PizzaBase.find();
  const sauce = await Sauce.find();
  const cheese = await Cheese.find();
  const veggies = await Veggies.find();
  const nonVeg = await NonVeg.find();
  if (!pizzaBase || !sauce || !cheese || !veggies || !nonVeg) {
    throw new Error("Recipe not found");
  }
  return {
    pizzaBase,
    sauce,
    cheese,
    veggies,
    nonVeg,
  };
};

export {
  addPizzaBaseService,
  updatePizzaBaseService,
  addSauceService,
  updateSauceService,
  addCheeseService,
  updateCheeseService,
  addVeggiesService,
  updateVeggiesService,
  addNonVegService,
  updateNonVegService,
  getAllRecipeService,
};
