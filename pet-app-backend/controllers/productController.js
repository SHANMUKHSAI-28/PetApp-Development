const Product = require("../models/Product");

module.exports = {
    createProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (err) {
            console.error("Error creating product:", err);
            res.status(500).json({ message: "Failed to create product", error: err.message });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (err) {
            console.error("Error getting all products:", err);
            res.status(500).json({ message: "Failed to get products", error: err.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (err) {
            console.error("Error getting product by ID:", err);
            res.status(500).json({ message: "Failed to get product", error: err.message });
        }
    },
     updateProduct: async (req, res) => {
        try {
          const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.status(200).json(updatedProduct);
        } catch (err) {
          res.status(500).json(err);
        }
      },
       deleteProduct: async (req, res) => {
        try {
          await Product.findByIdAndDelete(req.params.id);
          res.status(200).json("Product has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      },

};