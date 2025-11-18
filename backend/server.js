const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve product images
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));

// Load mock products
const products = require("./data/products");

// API to get products
app.get("/api/products", (req, res) => {
    res.json(products);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
