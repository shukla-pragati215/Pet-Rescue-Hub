import Exercise from "../models/exerciseModel.js";

export const getExerciseData = async (req, res) => {
  try {
    const data = await Exercise.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exercise data" });
  }
};
