import mongoose from "mongoose";

const orderPizzaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizzaBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PizzaBase",
      required: true,
    },
    sauceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sauce",
      required: true,
    },
    cheeseType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cheese",
      required: true,
    },
    veggies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veggies",
      },
    ],
    nonVeg: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NonVeg",
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderPizza = mongoose.model("OrderPizza", orderPizzaSchema);
