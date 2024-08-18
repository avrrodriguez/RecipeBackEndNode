import { Router } from 'express';
import { getUserIngredients, getUserIngredient, createUserIngredient, updateUserIngredient, deleteUserIngredient } from '../controller/ingredients_controller';
import { validate_auth } from "../auth/validate_auth";

const ingredientsRoutes = Router();

// routes for getting ingredients specific to users
ingredientsRoutes.route("/ingredients")
  .get(validate_auth, getUserIngredients)
  .post(validate_auth, createUserIngredient)

ingredientsRoutes.route("/ingredients/:ingredientId")
  .get(validate_auth, getUserIngredient)
  .put(validate_auth, updateUserIngredient)
  .delete(validate_auth, deleteUserIngredient)

export default ingredientsRoutes;