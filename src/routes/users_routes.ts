import { Router } from 'express';
import { getUser, createUser } from '../controller/users_controller';

const userRoutes = Router();

userRoutes.route("/users")
.post(createUser)


userRoutes.route("/users/:userId")
.get(getUser)

export default userRoutes;