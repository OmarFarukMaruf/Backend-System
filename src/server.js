import express from "express";
const app = express();
const port = "5001";

app.get("/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});