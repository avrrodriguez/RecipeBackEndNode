import { Router } from 'express';
import { getRecipes, updateRecipe, createRecipe, deleteRecipe, getRecipe } from '../controller/recipes_controller';

const recipeRoutes = Router();

recipeRoutes.route("/")
  .get(getRecipes)
  .post(createRecipe);

recipeRoutes.route("/f:recipeId")
  .get(getRecipe)
  .put(updateRecipe)
  .delete(deleteRecipe)

export default recipeRoutes;