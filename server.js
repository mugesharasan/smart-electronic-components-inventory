const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./backend/config/db");
const authRoutes = require("./backend/routes/authRoutes");
const productRoutes = require("./backend/routes/productRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});
console.log(authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
