import { Router } from 'express';
import { getUsers, getUser, createUser } from '../controller/users_controller';

const userRoutes = Router();

userRoutes.route("/users")
.get(getUsers)
.post(createUser)


userRoutes.route("/users/:userId")
.get(getUser)

export default userRoutes;