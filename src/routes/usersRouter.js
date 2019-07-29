import { Router } from "express";
import { getUsers } from "../controllers/users";
const usersRouter = Router();
usersRouter.get("/", getUsers);

export default usersRouter;
