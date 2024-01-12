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

const app = express();
mongoose.connect(
  "mongodb+srv://chienvuk:admin@cvukxwho.juzmebh.mongodb.net/?retryWrites=true&w=majority"
);

const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Server has been run on port ${port}!`);
});
