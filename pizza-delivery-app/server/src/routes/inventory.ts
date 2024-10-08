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
  getAllRecipeHandler,
} from "../controllers/inventory.controller";
import { verifyAdmin } from "../middlewares/jwt.middleware";

const inventoryRoute = Router();

inventoryRoute.get("/recipe", verifyAdmin, getAllRecipeHandler);
// inventoryRoute.post("/recipe", createRecipeHandler);
// inventoryRoute.put("/recipe", updateRecipeHandler);

inventoryRoute.post("/recipe/pizza-base", verifyAdmin, addPizzaBaseHandler);
inventoryRoute.put("/recipe/pizza-base", verifyAdmin, updatePizzaBaseHandler);

inventoryRoute.post("/recipe/sauce", verifyAdmin, addSauceHandler);
inventoryRoute.put("/recipe/sauce", verifyAdmin, updateSauceHandler);

inventoryRoute.post("/recipe/cheese", verifyAdmin, addCheeseHandler);
inventoryRoute.put("/recipe/cheese", verifyAdmin, updateCheeseHandler);

inventoryRoute.post("/recipe/veggies", verifyAdmin, addVeggiesHandler);
inventoryRoute.put("/recipe/veggies", updateVeggiesHandler);

inventoryRoute.post("/recipe/non-veg", verifyAdmin, addNonVegHandler);
inventoryRoute.put("/recipe/non-veg", verifyAdmin, updateNonVegHandler);

export { inventoryRoute };
