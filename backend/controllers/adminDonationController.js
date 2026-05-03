import AdminDonation from "../models/adminDonation.js";


// ✅ Add Donation
export const addAdminDonation = async (req, res) => {
  try {
    const { donorName, amount, message } = req.body;

    const donation = new AdminDonation({
      donorName,
      amount,
      message,
    });

    await donation.save();

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get All Donations
export const getAdminDonations = async (req, res) => {
  try {
    const donations = await AdminDonation.find().sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Delete Donation (Admin Power 😎)
export const deleteAdminDonation = async (req, res) => {
  try {
    await AdminDonation.findByIdAndDelete(req.params.id);

    res.json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
