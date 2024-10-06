import mongoose from "mongoose";

const pizzaBaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PizzaBase = mongoose.model("PizzaBase", pizzaBaseSchema);
