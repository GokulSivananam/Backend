const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ status: "error", message: "Access denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ status: "error", message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: "Invalid token" });
  }
};

exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ status: "error", message: "Admin access required" });
  }
  next();
};