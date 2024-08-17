import { Router } from 'express';
import { getUserRecipes, updateUserRecipe, createUserRecipe, deleteUserRecipe, getUserRecipe, getAllRecipes } from '../controller/recipes_controller';
import { validate_auth } from "../auth/validate_auth";

const recipeRoutes = Router();

// routes for getting recipes specific to users
recipeRoutes.route("/recipes")
  .get(validate_auth, getUserRecipes)
  .post(validate_auth, createUserRecipe);
  
recipeRoutes.route("/recipes/:recipeId")
  .get(validate_auth, getUserRecipe)
  .put(validate_auth, updateUserRecipe)
  .delete(validate_auth, deleteUserRecipe);

// routes for getting recipes for all users
recipeRoutes.route("/allrecipes/")
    .get(getAllRecipes);
    

export default recipeRoutes;