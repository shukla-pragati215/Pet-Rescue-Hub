import Activity from "../models/Activity.js";

export const logActivity = async (adminId, action, target) => {
  try {
    await Activity.create({
      adminId,
      action,
      target,
    });
  } catch (err) {
    console.log("Activity log failed:", err.message);
  }
};
