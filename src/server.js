import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

config();
const app = express();
const port = "5001";

app.get("/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});

app.use("/movies", movieRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});