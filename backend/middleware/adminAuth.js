import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(403).json({ message: "Not authorized" });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default adminAuth;
