import express from "express";
import {
  createTaskController,
  getTasksController,
  updateTaskController,
  getTaskController,
  deleteTaskController
} from "../controller/task-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
const privateRouter = express.Router();

privateRouter.post("/api/task", authMiddleware, createTaskController);
privateRouter.get("/api/tasks", authMiddleware, getTasksController);
privateRouter.get("/api/task/:taskId", authMiddleware, getTaskController);
privateRouter.put("/api/task/:taskId", authMiddleware, updateTaskController);
privateRouter.delete("/api/task/:taskId", authMiddleware, deleteTaskController);

export default privateRouter;
