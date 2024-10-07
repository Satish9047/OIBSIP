import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import * as recipeService from "../services/inventory.service";

export const addPizzaBaseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addPizzaBaseService(req.body);
    res.json(new ApiResponse(200, "Pizza base added successfully", data));
  }
);

export const updatePizzaBaseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updatePizzaBaseService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Pizza base updated successfully", data));
  }
);

export const addSauceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addSauceService(req.body);
    res.json(new ApiResponse(200, "Sauce added successfully", data));
  }
);

export const updateSauceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateSauceService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Sauce updated successfully", data));
  }
);

export const addCheeseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addCheeseService(req.body);
    res.json(new ApiResponse(200, "Cheese added successfully", data));
  }
);

export const updateCheeseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateCheeseService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Cheese updated successfully", data));
  }
);

export const addVeggiesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addVeggiesService(req.body);
    res.json(new ApiResponse(200, "Veggies added successfully", data));
  }
);

export const updateVeggiesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateVeggiesService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Veggies updated successfully", data));
  }
);

export const addNonVegHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addNonVegService(req.body);
    res.json(new ApiResponse(200, "Non-veg added successfully", data));
  }
);

export const updateNonVegHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateNonVegService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Non-veg updated successfully", data));
  }
);

export const getAllRecipeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.getAllRecipeService();
    res.status(200).json({
      message: "Recipe fetched successfully",
      data,
    });
  }
);

// export const createRecipeHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     res.status(200).json({
//       message: "Recipe created successfully",
//     });
//   }
// );

// export const updateRecipeHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     res.status(200).json({
//       message: "Recipe updated successfully",
//     });
//   }
// );
