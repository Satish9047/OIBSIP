import mongoose from "mongoose";

const SauceSchema = new mongoose.Schema(
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

export const Sauce = mongoose.model("Sauce", SauceSchema);
