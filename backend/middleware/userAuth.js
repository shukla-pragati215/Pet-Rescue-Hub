import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    // ✅ BLOCK CHECK
    if ((user.status || "").trim().toLowerCase() === "blocked") {
      return res.status(403).json({
        message: `Your account is blocked. Reason: ${user.blockedReason || "Contact admin"}`,
      });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default userAuth;