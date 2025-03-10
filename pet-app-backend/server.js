const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

// Import routes
const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const animalshopRoutes = require("./routes/animalshop");
// const productRoutes = require("./routes/products");
const crossingRoutes = require("./routes/crossing");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/animalshops", animalshopRoutes);
// app.use("/api/products", productRoutes);
app.use("/api/crossing", crossingRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));