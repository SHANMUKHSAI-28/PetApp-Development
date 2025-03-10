const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    petsshop: { type: mongoose.Schema.Types.ObjectId, ref: "Animalsshop" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageurl: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length > 0 && v.length <= 4;
        },
        message: "You can upload between 1 and 4 images.",
      },
      required: true,
    },
    Breed_name: { type: String, required: true },
    quality: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    petParentsMatingVideo: { type: String }, // Make sure you validate video URL on client side.
    Breed_lineage: { type: String, required: true },
    Address: { type: String, required: true },
    Gender: { type: String, required: true, enum: ["Male", "Female"] },
    status: { type: String, default: "available", enum: ["available", "unavailable"] },
    location: { type: String, required: true },
    age: { type: Number, required: true },
    vaccination: { type: String, required: true },
    Breeder_Name: { type: String, required: true },
    Contact_Number: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Contact number must be a 10-digit number.",
      },
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);