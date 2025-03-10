const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/verifyToken");
const { createProductValidationRules } = require("../middleware/validations/productValidation");
const validate = require("../middleware/validate");
const { checkRole } = require("../middleware/accessControl");

router.post(
  "/",
  verifyToken,
  checkRole(["Vendor", "Admin"]),
  createProductValidationRules(),
  validate,
  productController.createProduct
);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  verifyToken,
  checkRole(["Vendor", "Admin"]),
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyToken,
  checkRole(["Vendor", "Admin"]),
  productController.deleteProduct
);

module.exports = router;