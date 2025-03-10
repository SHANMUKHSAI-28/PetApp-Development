const Crossing = require("../models/Crossing");

module.exports = {
  createCrossing: async (req, res) => {
    try {
      const newCrossing = new Crossing(req.body);
      const savedCrossing = await newCrossing.save();
      res.status(201).json(savedCrossing);
    } catch (err) {
      console.error("Error creating crossing:", err);
      res
        .status(500)
        .json({ message: "Failed to create crossing", error: err.message });
    }
  },
  getAllCrossings: async (req, res) => {
    try {
      const crossings = await Crossing.find();
      res.status(200).json(crossings);
    } catch (err) {
      console.error("Error getting all crossings:", err);
      res
        .status(500)
        .json({ message: "Failed to get crossings", error: err.message });
    }
  },
  getCrossingById: async (req, res) => {
    try {
      const crossing = await Crossing.findById(req.params.id);
      if (!crossing) {
        return res.status(404).json({ message: "Crossing not found" });
      }
      res.status(200).json(crossing);
    } catch (err) {
      console.error("Error getting crossing by ID:", err);
      res
        .status(500)
        .json({ message: "Failed to get crossing", error: err.message });
    }
  },
   updateCrossing: async (req, res) => {
    try {
      const updatedCrossing = await Crossing.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedCrossing) {
        return res.status(404).json({ message: "Crossing not found" });
      }
      res.status(200).json(updatedCrossing);
    } catch (err) {
      res.status(500).json(err);
    }
  },
   deleteCrossing: async (req, res) => {
    try {
      await Crossing.findByIdAndDelete(req.params.id);
      res.status(200).json("Crossing has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};