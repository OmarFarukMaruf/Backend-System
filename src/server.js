import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

config();
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = "5001";

app.get("/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchListRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => { 
  console.error("Unhandled Rejection at:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1); // Exit the process with an error code
    });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1); // Exit the process with an error code
    });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0); // Exit the process with a success code
  });
});