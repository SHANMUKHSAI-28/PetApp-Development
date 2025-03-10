const router = require("express").Router();
const { verifyToken, verifyVendor, verifyAdmin } = require("../middleware/verifyToken");

// Basic route structure
router.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Animal shop route working" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;