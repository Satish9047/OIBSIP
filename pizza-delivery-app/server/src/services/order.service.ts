import { ApiError } from "../utils/apiResponse";
import { OrderPizza } from "../models/order.model";
import { IOrder, Pizza } from "../interface/app.interface";
import { PizzaBase } from "../models/pizzaBase.model";
import { Sauce } from "../models/sauce.model";
import { Cheese } from "../models/cheese.model";
import { Veggies } from "../models/veggies.model";
import { NonVeg } from "../models/nonVeg.model";
import { decreaseQuantity } from "../utils/decreaseQuantity";

const getAllOrderService = async () => {
  const data = await OrderPizza.find({})
    .populate({ path: "user", select: "name email phone address" })
    .populate({ path: "pizzaBase", select: "_id, name" })
    .populate({ path: "sauceType", select: "_id, name" })
    .populate({ path: "cheeseType", select: "_id, name" })
    .populate({ path: "veggies", select: "_id, name" })
    .populate({ path: "nonVeg", select: "_id, name" });
  if (!data) {
    throw new ApiError(404, "Orders not found");
  }
  return data;
};

const createOrderService = async (user: any, pizza: IOrder) => {
  const pizzaOrder = { ...pizza, user: user.id };
  const pizzaBase = await PizzaBase.findById(pizzaOrder.pizzaBaseId);
  const sauce = await Sauce.findById(pizzaOrder.pizzaSauceId);
  const cheese = await Cheese.findById(pizzaOrder.pizzaCheeseId);
  const veggies = await Veggies.find({
    _id: { $in: pizzaOrder.pizzaVeggiesIds },
  });
  const nonVeg = await NonVeg.find({ _id: { $in: pizzaOrder.pizzaNonVegIds } });

  if (!pizzaBase || !sauce || !cheese) {
    throw new ApiError(404, "Pizza component not found");
  }

  await decreaseQuantity(
    PizzaBase,
    pizzaOrder.pizzaBaseId,
    pizza.quantity,
    "Pizza Base"
  );
  await decreaseQuantity(
    Sauce,
    pizzaOrder.pizzaSauceId,
    pizza.quantity,
    "Sauce"
  );
  await decreaseQuantity(
    Cheese,
    pizzaOrder.pizzaCheeseId,
    pizza.quantity,
    "Cheese"
  );

  // Decrease the quantity for multiple veggies
  const veggie = await Veggies.find({
    _id: { $in: pizzaOrder.pizzaVeggiesIds },
  });
  for (const veg of veggie) {
    await decreaseQuantity(Veggies, veg.id, pizza.quantity, veg.name);
  }

  // Decrease the quantity for multiple non-veg items
  const nonVegs = await NonVeg.find({
    _id: { $in: pizzaOrder.pizzaNonVegIds },
  });
  for (const meat of nonVegs) {
    await decreaseQuantity(NonVeg, meat.id, pizza.quantity, meat.name);
  }

  let totalPrice = pizzaBase.price + sauce.price + cheese.price;
  veggies.forEach((veggie) => {
    totalPrice += veggie.price;
  });

  nonVeg.forEach((meat) => {
    totalPrice += meat.price;
  });

  totalPrice *= pizza.quantity;

  const order = await OrderPizza.create({
    user: user.id,
    pizzaBase: pizzaOrder.pizzaBaseId,
    sauceType: pizzaOrder.pizzaSauceId,
    cheeseType: pizzaOrder.pizzaCheeseId,
    veggies: pizzaOrder.pizzaVeggiesIds,
    nonVeg: pizzaOrder.pizzaNonVegIds,
    quantity: pizzaOrder.quantity,
    price: totalPrice,
  });

  if (!order) {
    throw new ApiError(400, "Failed to create pizza order");
  }

  return order;
};

const updateOrderDeliverService = async (id: string, pizza: Pizza) => {
  const order = await OrderPizza.findByIdAndUpdate(id, pizza);
  if (!order) {
    throw new ApiError(400, "Error while updating pizza order");
  }
  return order;
};

const deleteOrderService = async (id: string) => {
  const order = await OrderPizza.findByIdAndDelete(id);
  if (!order) {
    throw new ApiError(400, "Error while deleting pizza order");
  }
  return order;
};

export {
  getAllOrderService,
  createOrderService,
  updateOrderDeliverService,
  deleteOrderService,
};
