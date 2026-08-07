import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Product from "./src/models/Product.js";

const products = [
  {
    name: "Aether Wireless Headphones",
    slug: "aether-wireless-headphones",
    description:
      "Over-ear wireless headphones with active noise cancellation and 40-hour battery life.",
    price: 179.99,
    category: "audio",
    image: "",
    stock: 25,
    rating: 4.7,
  },
  {
    name: "Nova Mechanical Keyboard",
    slug: "nova-mechanical-keyboard",
    description:
      "Hot-swappable mechanical keyboard with per-key RGB and tactile brown switches.",
    price: 129.99,
    category: "peripherals",
    image: "",
    stock: 40,
    rating: 4.8,
  },
  {
    name: 'Zenith 27" 4K Monitor',
    slug: "zenith-27-4k-monitor",
    description:
      "27-inch 4K IPS display with 144Hz refresh rate and USB-C connectivity.",
    price: 449.99,
    category: "displays",
    image: "",
    stock: 15,
    rating: 4.6,
  },
  {
    name: "Pulse Wireless Mouse",
    slug: "pulse-wireless-mouse",
    description:
      "Ultra-lightweight wireless mouse with 26000 DPI sensor and 70-hour battery.",
    price: 79.99,
    category: "peripherals",
    image: "",
    stock: 60,
    rating: 4.5,
  },
  {
    name: "Drift Desk Mat XL",
    slug: "drift-desk-mat-xl",
    description:
      "Extended stitched-edge desk mat, water-resistant surface, 900x400mm.",
    price: 34.99,
    category: "workspace",
    image: "",
    stock: 80,
    rating: 4.9,
  },
  {
    name: "Halo Monitor Light Bar",
    slug: "halo-monitor-light-bar",
    description:
      "Asymmetric monitor light bar with adjustable warmth and brightness, zero screen glare.",
    price: 54.99,
    category: "workspace",
    image: "",
    stock: 35,
    rating: 4.4,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    await mongoose.disconnect();
    console.log("Done — disconnected");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
