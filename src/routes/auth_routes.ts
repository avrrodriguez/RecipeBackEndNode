import { Router } from "express";
import { signup } from "../controller/auth_controller";

let authRoutes = Router();

authRoutes.route("/signup")
  .post(signup)

//authRoutes.route("/login")
//  .get(login)

export default authRoutes;