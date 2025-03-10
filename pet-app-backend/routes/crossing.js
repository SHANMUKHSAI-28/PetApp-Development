const router = require("express").Router();
const crossingController = require("../controllers/crossingController");
const { verifyToken, verifyVendor, verifyAdmin } = require("../middleware/verifyToken");

router.post("/", verifyVendor, crossingController.createCrossing);
router.get("/", crossingController.getAllCrossings);
router.get("/:id", crossingController.getCrossingById);
router.put("/:id", verifyVendor, crossingController.updateCrossing);
router.delete("/:id", verifyVendor, crossingController.deleteCrossing);

module.exports = router;