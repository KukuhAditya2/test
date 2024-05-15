import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;
  try {
    const decode = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = {
      id: decode.id,
      email: decode.email
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
