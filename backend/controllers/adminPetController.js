import Pet from "../models/Pet.js";


// ✅ GET ALL PETS
export const getAllPetsAdmin = async (req, res) => {
  try {

    const pets = await Pet.find().sort({ createdAt: -1 });

    res.json(pets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ ADD PET
export const addPetAdmin = async (req, res) => {
  try {

    const pet = new Pet({
      ...req.body,
      image: req.file ? req.file.filename : "",
    });

    await pet.save();

    res.status(201).json(pet);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ UPDATE PET
export const updatePetAdmin = async (req, res) => {
  try {

    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(pet);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ DELETE PET
export const deletePetAdmin = async (req, res) => {
  try {

    await Pet.findByIdAndDelete(req.params.id);

    res.json({ message: "Pet deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
