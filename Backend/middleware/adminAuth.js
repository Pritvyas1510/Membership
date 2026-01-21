import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "Token required" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
