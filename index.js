import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ENV
dotenv.config();

//import routes
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import brandRouter from "./routes/brand.js";
import userRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import billRouter from "./routes/bill.js";

const app = express();
mongoose.connect(
  "mongodb+srv://chienvuk:admin@cvukxwho.juzmebh.mongodb.net/?retryWrites=true&w=majority"
);

const port = process.env.PORT || 3003;
process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/brand", brandRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/bill", billRouter);

app.listen(port, () => {
  console.log(`Server has been run on port ${port}!`);
});
