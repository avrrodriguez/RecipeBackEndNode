import { Router } from 'express';
import { getRecipes, updateRecipe, createRecipe, deleteRecipe, getRecipe } from '../controller/recipes_controller';

const recipeRoutes = Router();

recipeRoutes.route("/recipes")
  .get(getRecipes)
  .post(createRecipe);

recipeRoutes.route("/recipes/:recipeId")
  .get(getRecipe)
  .put(updateRecipe)
  .delete(deleteRecipe)

export default recipeRoutes;