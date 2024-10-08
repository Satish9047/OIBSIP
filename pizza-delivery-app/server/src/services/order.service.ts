import { ApiError } from "../utils/apiResponse";
import { OrderPizza } from "../models/order.model";
import { IOrder, JwtUser, Pizza } from "../interface/app.interface";
import { PizzaBase } from "../models/pizzaBase.model";
import { Sauce } from "../models/sauce.model";
import { Cheese } from "../models/cheese.model";
import { Veggies } from "../models/veggies.model";
import { NonVeg } from "../models/nonVeg.model";

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
  // console.log("pizzaOrder service:", pizzaOrder);
  // console.log("pizzaOrder service:", pizza);
  // console.log("pizzaOrder service1:", pizzaOrder);
  // Fetch the details of selected pizza components
  const pizzaBase = await PizzaBase.findById(pizzaOrder.pizzaBaseId);
  const sauce = await Sauce.findById(pizzaOrder.pizzaSauceId);
  const cheese = await Cheese.findById(pizzaOrder.pizzaCheeseId);
  const veggies = await Veggies.find({
    _id: { $in: pizzaOrder.pizzaVeggiesIds },
  });
  const nonVeg = await NonVeg.find({ _id: { $in: pizzaOrder.pizzaNonVegIds } });

  console.log("pizzaOrder service1:", pizzaBase);
  console.log("pizzaOrder service2:", sauce);
  console.log("pizzaOrder service3:", cheese);
  console.log("pizzaOrder service4:", veggies);
  console.log("pizzaOrder service5:", nonVeg);

  // If any of the components are not found, throw an error
  if (!pizzaBase || !sauce || !cheese) {
    throw new ApiError(404, "Pizza component not found");
  }

  // Calculate total price based on the components and quantity
  let totalPrice = pizzaBase.price + sauce.price + cheese.price;
  console.log("totalPrice:", totalPrice);
  veggies.forEach((veggie) => {
    totalPrice += veggie.price;
  });

  nonVeg.forEach((meat) => {
    totalPrice += meat.price;
  });

  // Multiply by quantity
  totalPrice *= pizza.quantity;

  // Create the order
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

  console.log("from Order Service", order);
  if (!order) {
    throw new ApiError(400, "Failed to create pizza order");
  }

  return order;
};

const updateOrderService = async (id: string, pizza: Pizza) => {
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
  updateOrderService,
  deleteOrderService,
};
