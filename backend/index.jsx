import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});