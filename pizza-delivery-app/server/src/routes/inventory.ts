import { Router } from "express";

import {
  addPizzaBaseHandler,
  updatePizzaBaseHandler,
  addSauceHandler,
  updateSauceHandler,
  addCheeseHandler,
  updateCheeseHandler,
  addVeggiesHandler,
  updateVeggiesHandler,
  addNonVegHandler,
  updateNonVegHandler,
} from "../controllers/inventory.controller";

const inventoryRoute = Router();

// inventoryRoute.get("/recipe", getAllRecipeHandler);
// inventoryRoute.post("/recipe", createRecipeHandler);
// inventoryRoute.put("/recipe", updateRecipeHandler);

inventoryRoute.post("/recipe/pizza-base", addPizzaBaseHandler);
inventoryRoute.put("/recipe/pizza-base", updatePizzaBaseHandler);

inventoryRoute.post("/recipe/sauce", addSauceHandler);
inventoryRoute.put("/recipe/sauce", updateSauceHandler);

inventoryRoute.post("/recipe/cheese", addCheeseHandler);
inventoryRoute.put("/recipe/cheese", updateCheeseHandler);

inventoryRoute.post("/recipe/veggies", addVeggiesHandler);
inventoryRoute.put("/recipe/veggies", updateVeggiesHandler);

inventoryRoute.post("/recipe/non-veg", addNonVegHandler);
inventoryRoute.put("/recipe/non-veg", updateNonVegHandler);

export { inventoryRoute };
