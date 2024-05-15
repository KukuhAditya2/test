import { prismaClient } from "../application/database.js";
import {
  createdValidation,
  taskValidation
} from "../validation/task-validation.js";
import validate from "../validation/validation.js";

export const createTask = async (request, userId) => {
  const userValidate = validate(createdValidation, request);

  await prismaClient.task.create({
    data: {
      title: userValidate.title,
      description: userValidate.description,
      userId: userId
    }
  });
};

export const getTasks = async (userId) => {
  return prismaClient.task.findMany({
    where: {
      userId: userId
    }
  });
};

export const getTaskById = async (userId, taskId, res) => {
  const data = await prismaClient.task.findFirst({
    where: {
      id: parseInt(taskId),
      userId: userId
    },
    select: {
      id: true,
      title: true,
      description: true
    }
  });

  if (!data) {
    res.status(404).json({
      code: 404,
      message: "Task User Not Found"
    });
  }

  return data;
};

export const updateTask = async (request, userId, taskId, res) => {
  const userValidate = validate(taskValidation, request);

  const countData = await prismaClient.task.count({
    where: {
      id: parseInt(taskId),
      userId: userId
    }
  });

  if (countData === 0) {
    res.status(404).json({
      code: 404,
      message: "Task User Not Found"
    });
  }

  let dataUser = {};
  if (request.description) {
    dataUser.description = userValidate.description;
  }
  if (request.title) {
    dataUser.title = userValidate.title;
  }

  await prismaClient.task.update({
    where: {
      id: parseInt(taskId),
      userId: userId
    },
    data: dataUser
  });
};

export const deleteTask = async (userId, taskId, res) => {
  const countData = await prismaClient.task.count({
    where: {
      id: parseInt(taskId),
      userId: userId
    }
  });

  if (countData === 0) {
    res.status(404).json({
      code: 404,
      message: "Task not Found"
    });
  }

  await prismaClient.task.delete({
    where: {
      id: parseInt(taskId),
      userId: userId
    }
  });
};
