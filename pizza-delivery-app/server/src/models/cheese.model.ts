import mongoose from "mongoose";
const cheeseSchema = new mongoose.Schema(
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

export const Cheese = mongoose.model("Cheese", cheeseSchema);
