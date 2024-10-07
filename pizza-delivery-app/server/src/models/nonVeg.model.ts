import mongoose from "mongoose";
const veggiesSchema = new mongoose.Schema(
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

export const NonVeg = mongoose.model("NonVeg", veggiesSchema);