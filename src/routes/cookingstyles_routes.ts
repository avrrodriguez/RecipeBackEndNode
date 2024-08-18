import { Router } from 'express';
import { getUserCookingStyles, getUserCookingStyle, createUserCookingStyle, updateUserCookingStyle, deleteUserCookingStyle } from '../controller/cookingstyles_controller';
import { validate_auth } from "../auth/validate_auth";

const cookingStylesRoutes = Router();

// routes for getting cooking styles specific to users
cookingStylesRoutes.route("/cookingstyles")
  .get(validate_auth, getUserCookingStyles)
  .post(validate_auth, createUserCookingStyle)

cookingStylesRoutes.route("/cookingstyles/:cookingstyleId")
  .get(validate_auth, getUserCookingStyle)
  .put(validate_auth, updateUserCookingStyle)
  .delete(validate_auth, deleteUserCookingStyle)

export default cookingStylesRoutes;