export const allowRoles = (...allowed) => {
  return (req, res, next) => {
    if (!allowed.includes(req.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
