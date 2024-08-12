import { Router } from 'express';
import { getRecipes, updateRecipe, createRecipe, deleteRecipe, getRecipe } from '../controller/recipes_controller';
import { validate_auth } from "../auth/validate_auth";

const recipeRoutes = Router();

// routes for getting recipes specific to users
recipeRoutes.route("/recipes")
  .get(validate_auth, getRecipes)
  .post(validate_auth, createRecipe);

recipeRoutes.route("/recipes/:recipeId")
  .get(validate_auth, getRecipe)
  .put(validate_auth ,updateRecipe)
  .delete(validate_auth, deleteRecipe)

// routes for getting recipes for all users
recipeRoutes.route("/recipes/show")

export default recipeRoutes;