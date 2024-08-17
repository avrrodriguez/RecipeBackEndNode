import { Router } from 'express';
import { getUserIngredients } from '../controller/ingredients_controller';
import { validate_auth } from "../auth/validate_auth";

const ingredientsRoutes = Router();

// routes for getting ingredients specific to users
ingredientsRoutes.route("/ingredients")
  .get(getUserIngredients)

export default ingredientsRoutes;