"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Define shop categories manually inside this file
const shopCategories = [
  { id: "all-products", label: "All Products", path: "/product/listing/all-products" },
  { id: "retrofit", label: "Retrofit", path: "/product/listing/RetroFit" },
  { id: "smart-switches", label: "Smart Switches", path: "/product/listing/SmartSwitches" },
  { id: "security", label: "Security", path: "/product/listing/Security" }
];

export default function NavLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8 text-primary"
        >
          Shop Categories
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shopCategories.map(category => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-primary">{category.label}</h2>
              <Link href={category.path} className="text-sm text-blue-600 hover:underline">
                Explore
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
