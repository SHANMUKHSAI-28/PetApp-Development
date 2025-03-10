const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyToken, verifyVendor, verifyAdmin } = require("../middleware/verifyToken");

router.post("/", verifyVendor, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", verifyVendor, productController.updateProduct);
router.delete("/:id", verifyVendor, productController.deleteProduct);

module.exports = router;