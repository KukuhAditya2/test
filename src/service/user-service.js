import { prismaClient } from "../application/database.js";
import {
  registerUserValidation,
  loginUserValidation
} from "../validation/user-validation.js";
import validate from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request, res) => {
  const user = validate(registerUserValidation, request);

  if (user.error) {
    res.status(400).json({
      code: 400,
      message: user.error
    });
  }

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email
    }
  });

  if (countUser === 1) {
    res.status(400).json({
      code: 400,
      message: "Email Already Exist"
    });
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: {
      email: user.email,
      password: user.password
    },
    select: {
      id: true,
      email: true
    }
  });
};

export const login = async (request, res) => {
  const user = validate(loginUserValidation, request);

  if (user.error) {
    res.status(400).json({
      code: 400,
      message: user.error
    });
  }

  const result = await prismaClient.user.findFirst({
    where: {
      email: user.email
    }
  });
  if (!result) {
    res.status(400).json({
      code: 400,
      message: "Email Or Password Wrong"
    });
  } else if (!(await bcrypt.compare(user.password, result.password))) {
    res.status(400).json({
      code: 400,
      message: "Email Or Password Wrong"
    });
  }

  const token = jwt.sign(
    { id: result.id, email: result.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return token;
};

export default {
  register,
  login
};
