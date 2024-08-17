import { Router } from 'express';
import { getUserCookingStyles } from '../controller/cookingstyles_controller';
import { validate_auth } from "../auth/validate_auth";

const cookingStylesRoutes = Router();

// routes for getting cooking styles specific to users
cookingStylesRoutes.route("/cookingstyles")
  .get(getUserCookingStyles)

export default cookingStylesRoutes;