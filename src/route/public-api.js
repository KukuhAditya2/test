import express from "express";
import userController from "../controller/user-controller.js";

const publictRouter = express.Router();

publictRouter.post("/api/users/register", userController.register);
publictRouter.post("/api/users/login", userController.login);

export { publictRouter };
