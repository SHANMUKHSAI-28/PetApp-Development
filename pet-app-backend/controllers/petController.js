const Pet = require("../models/Pet");

// Define the createPet controller function
const createPet = async (req, res) => {
    try {
        const newPet = new Pet(req.body); // Assuming you have a Pet model
        const savedPet = await newPet.save();
        res.status(201).json(savedPet); // 201 Created
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(500).json({ message: "Failed to create pet", error: error.message });
    }
};
module.exports = {
    createPet,
};