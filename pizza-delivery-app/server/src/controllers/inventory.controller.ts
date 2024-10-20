import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import * as recipeService from "../services/inventory.service";

/**
 * @desc          Add pizza base
 * @route         POST /api/v1/inventory/recipe/pizza-base
 * @access        Admin
 */
export const addPizzaBaseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addPizzaBaseService(req.body);
    res.json(new ApiResponse(200, "Pizza base added successfully", data));
  }
);

/**
 * @desc          Update pizza base
 * @route         PUT /api/v1/inventory/recipe/pizza-base
 * @access        Admin
 */
export const updatePizzaBaseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updatePizzaBaseService(req.body);
    res.json(new ApiResponse(200, "Pizza base updated successfully", data));
  }
);

/**
 * @desc          Add pizza Sauce
 * @route         POST /api/v1/inventory/recipe/pizza-sauce
 * @access        Admin
 */
export const addSauceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addSauceService(req.body);
    res.json(new ApiResponse(200, "Sauce added successfully", data));
  }
);

/**
 * @desc          Update pizza Sauce
 * @route         PUT /api/v1/inventory/recipe/pizza-sauce
 * @access        Admin
 */
export const updateSauceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateSauceService(req.body);
    res.json(new ApiResponse(200, "Sauce updated successfully", data));
  }
);

/**
 * @desc          Add pizza Cheese
 * @route         POST /api/v1/inventory/recipe/pizza-cheese
 * @access        Admin
 */
export const addCheeseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addCheeseService(req.body);
    res.json(new ApiResponse(200, "Cheese added successfully", data));
  }
);

/**
 * @desc          Update pizza Cheese
 * @route         PUT /api/v1/inventory/recipe/pizza-cheese
 * @access        Admin
 */
export const updateCheeseHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateCheeseService(req.body);
    res.json(new ApiResponse(200, "Cheese updated successfully", data));
  }
);

/**
 * @desc          Add pizza Veggies
 * @route         POST /api/v1/inventory/recipe/pizza-veggies
 * @access        Admin
 */
export const addVeggiesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addVeggiesService(req.body);
    res.json(new ApiResponse(200, "Veggies added successfully", data));
  }
);

/**
 * @desc          Update pizza Veggies
 * @route         PUT /api/v1/inventory/recipe/pizza-veggies
 * @access        Admin
 */
export const updateVeggiesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateVeggiesService(req.body);
    res.json(new ApiResponse(200, "Veggies updated successfully", data));
  }
);

/**
 * @desc          Add pizza Non-veg
 * @route         POST /api/v1/inventory/recipe/pizza-non-veg
 * @access        Admin
 */
export const addNonVegHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.addNonVegService(req.body);
    res.json(new ApiResponse(200, "Non-veg added successfully", data));
  }
);

/**
 * @desc          Update pizza Non-veg
 * @route         PUT /api/v1/inventory/recipe/pizza-non-veg
 * @access        Admin
 */
export const updateNonVegHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.updateNonVegService(req.body);
    res.json(new ApiResponse(200, "Non-veg updated successfully", data));
  }
);

/**
 * @desc          Get All Recipe
 * @route         POST /api/v1/inventory/recipe
 * @access        Admin
 */
export const getAllRecipeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await recipeService.getAllRecipeService();
    res.json(new ApiResponse(200, "Recipe fetched successfully", data));
  }
);
