import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// ENV
dotenv.config();

//import routes
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import productRouter from "./routes/product.js";
import brandRouter from "./routes/brand.js";
import categoryRouter from "./routes/category.js";

const app = express();
mongoose.connect(
  "mongodb+srv://chienvuk:admin@cvukxwho.juzmebh.mongodb.net/?retryWrites=true&w=majority"
);

const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/api/products", productRouter);
app.use("/api/brands", brandRouter);
app.use("/api/categories", categoryRouter);

app.listen(port, () => {
  console.log(`Server has been run on port ${port}!`);
});
