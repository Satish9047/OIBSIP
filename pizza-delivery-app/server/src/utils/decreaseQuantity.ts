import { Model, Document } from "mongoose";
import { ApiError } from "./apiResponse";

export const decreaseQuantity = async (
  model: any,
  recipeId: string,
  quantity: number,
  recipeName: string
): Promise<void> => {
  try {
    const ingredient = await model.findById({ _id: recipeId });

    if (!ingredient) {
      throw new ApiError(404, `${recipeName} not found`);
    }

    if (ingredient.get("totalQuantity") < quantity) {
      throw new ApiError(
        400,
        `Not enough ${ingredient.get("name")} for this order`
      );
    }

    await model.findByIdAndUpdate(recipeId, {
      $inc: { totalQuantity: -quantity },
    });
  } catch (error) {
    throw new ApiError(500, "Failed to decrease quantity");
  }
};
