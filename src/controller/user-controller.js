import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body, res);
    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const token = await userService.login(req.body, res);
    res.status(200).json({
      code: 200,
      data: token
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login
};
