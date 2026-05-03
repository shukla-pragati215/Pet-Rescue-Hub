import mongoose from "mongoose";

const petShopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
    opens: { type: String, default: "Closes 9pm" },

    address: { type: String, default: "" },

    // Geo location
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("PetShop", petShopSchema);