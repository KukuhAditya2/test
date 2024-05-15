import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateTask
} from "../service/task-service.js";

export const createTaskController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await createTask(req.body, userId);
    res.status(200).json({
      code: 200,
      message: "success created task"
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    await updateTask(req.body, userId, taskId, res);
    res.status(200).json({
      code: 200,
      message: "success updated task"
    });
  } catch (error) {
    next(error);
  }
};

export const getTasksController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getTasks(userId);
    res.status(200).json({
      code: 200,
      date: result
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const result = await getTaskById(userId, taskId, res);
    res.status(200).json({
      code: 200,
      date: result
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    await deleteTask(userId, taskId, res);
    res.status(200).json({
      code: 200,
      message: "deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
