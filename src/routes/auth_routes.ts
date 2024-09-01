import { Router } from "express";
import { signup, login } from "../controller/auth_controller";

let authRoutes = Router();

authRoutes.route("/signup")
  .post(signup)

authRoutes.route("/login")
  .post(login)

export default authRoutes;