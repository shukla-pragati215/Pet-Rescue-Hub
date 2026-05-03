import User from "../models/user.js";

// GET all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// BLOCK / UNBLOCK user
export const toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.status = user.status === "Active" ? "Blocked" : "Active";
  await user.save();

  res.json({ message: "User status updated", status: user.status });
};

// DELETE user
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
};
