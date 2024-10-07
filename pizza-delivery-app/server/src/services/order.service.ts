import { ApiError } from "../utils/apiResponse";
import { OrderPizza } from "../models/order.model";
import { Pizza } from "../interface/app.interface";

const getAllOrderService = async () => {
  const data = await OrderPizza.find({})
    .populate("user")
    .populate("pizzaBase")
    .populate("sauceType")
    .populate("cheeseType")
    .populate("veggies")
    .populate("nonVeg");
  if (!data) {
    throw new ApiError(404, "Orders not found");
  }
  return data;
};

const createOrderService = async (pizza: Pizza) => {
  const order = await OrderPizza.create(pizza);
  if (!order) {
    throw new ApiError(400, "Error while creating pizza order");
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
